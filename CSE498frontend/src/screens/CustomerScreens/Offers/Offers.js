import React, { Component, useEffect, useState } from 'react';
import Carousel from "../../../components/Carousel/Carousel";
import PageHeader from '../../../components/PageHeader/PageHeader';
import { FooterContainer } from '../../../containers/footer';
import { getOfferDetails, getAllOffers } from '../../../actions/offersAction';
import { getBusinessDetails, getCustomerDetails } from '../../../actions/customerAction';
import styles from './Offers.css';
import { getInputData } from '../../../actions/mlDataset';
import { fetchMlResult } from '../../../components/MLFunction';

const scrollToTravel = (id) => {
    const element = document.getElementById(id);
    element?.scrollIntoView({ behavior: 'smooth' });
};


const Offers = () => {
    const [offerIDs, setOfferIDs] = useState(null);
    const [allOffersWithDetails, setAllOffersWithDetails] = useState([]);
    const [hiddenOffers, setHiddenOffers] = useState([]);
    const [MlInputData, setMlInputData] = useState(null);

    const userId = JSON.parse(localStorage.getItem('userProfile')).id;

    const hideUserOffers = (userOffers) => {
        let hideTheseOffers = [];
        userOffers.expired.map((offer) => {
            hideTheseOffers.push(offer);
        });
        userOffers.redeemed.map((offer) => {
            hideTheseOffers.push(offer);
        });
        userOffers.saved.map((offer) => {
            hideTheseOffers.push(offer);
        });
        setHiddenOffers(hideTheseOffers);
    };

    useEffect(() => {
        const loadAllOffers = async () => {
            const allOffers = await getAllOffers();
            const userInfo = await getCustomerDetails(userId);
            setOfferIDs(allOffers);
            hideUserOffers(userInfo);
        };
        loadAllOffers();
    }, []);

    useEffect(() => {
        const getAllOfferDetails = async () => {
            const showTheseOffers = offerIDs.filter(offer => !hiddenOffers.includes(offer));
            let categorizedOffers = [];
            await Promise.all(showTheseOffers.map(async (offer) => {
                const details = await getOfferDetails(offer);
                const businessID = details.businessId;
                const businessDetails = await getBusinessDetails(businessID);
                const businessName = businessDetails.businessName;
                const category = businessDetails.category;
                // if (!categorizedOffers.find(item => item.category === 'recommended')) {
                //     categorizedOffers.push({ category: 'recommended', offers: [] })
                //   };                  
                if (!categorizedOffers.find(item => item.category === category)) {
                    categorizedOffers.push({ category: category, offers: [] })
                };
                const data = {
                    offerID: details._id,
                    businessID: businessID,
                    businessName: businessName,
                    category: category,
                    title: details.title,
                    description: details.description,
                    code: details.offerCode,
                    image: businessDetails.profileImage,
                    startDate: details.startDate,
                    endDate: details.endDate,
                };
                const offerCategoryList = categorizedOffers.find(item => item.category === category);
                offerCategoryList.offers.push(data);
            }));
            setAllOffersWithDetails(categorizedOffers);
        };
        getAllOfferDetails();
    }, [hiddenOffers]);

    useEffect(() => {
        const fetchData = async () => {
            const inputData = await getInputData(userId);
            setMlInputData(inputData);
        }
        
        if (!MlInputData) {
            fetchData();
        }

        if (MlInputData) {
            // We have the input data
            fetchMlResult(MlInputData);
        }
	}, [MlInputData]);




    const getCategoryLabel = (category) => {
        if (category === 'recommended') {
            return 'Recommended';
        } if (category === 'food') {
			return 'Food & Drink';
		} else if (category === 'home') {
			return 'Home';
		} else if (category === 'beauty') {
			return 'Beauty & Spas';
		} else if (category === 'retail') {
			return 'Fashion';
		} else {
			return 'Other';
		};
    };

    const carouselCards = () => {
        return (
          <div>
            <div id="recommended" className="carousel">
              <h3 className="carousel-title text-center py-20 font-bold font-medium leading-tight text-3xl">Recommended</h3>
              <Carousel offers={[]} />
            </div>
            {allOffersWithDetails.map((item) => {
              return (
                <div id={item.category} className="carousel" key={item.category}>
                  <h3 className="carousel-title text-center py-20 font-bold font-medium leading-tight text-3xl">{getCategoryLabel(item.category)}</h3>
                  <Carousel offers={item.offers}/>
                </div>
              );
            })}
          </div>
        );
      };
      

    return  (
        <div>
            <PageHeader screen={'/offers'} />
            <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
            <h3 className="text-center bg-gray-50 text-gray-800 py-20 text-3xl font-bold font-medium leading-tight text-5xl">Welcome, Ally Customer!</h3>

            <button onClick={()=>scrollToTravel('recommended')} className="button bg-blue-500 text-white font-bold py-2 px-4 rounded">Recommended</button>
            <button onClick={()=>scrollToTravel('home')} className="button bg-blue-500 text-white font-bold py-2 px-4 rounded">Home</button>
            <button onClick={()=>scrollToTravel('food')} className="button bg-blue-500 text-white font-bold py-2 px-4 rounded">Food & Drink</button>
            <button onClick={()=>scrollToTravel('beauty')} className="button bg-blue-500 text-white font-bold py-2 px-4 rounded">Beauty & Spas</button>
            <button onClick={()=>scrollToTravel('retail')} className="button bg-blue-500 text-white font-bold py-2 px-4 rounded">Fashion</button>

            {/* <button onClick={()=>scrollToTravel('to-do')} className="button bg-blue-500 text-white font-bold py-2 px-4 rounded">Things To Do</button>
            <button onClick={()=>scrollToTravel('health')} className="button bg-blue-500 text-white font-bold py-2 px-4 rounded">Health & Fitness</button>
            <button onClick={()=>scrollToTravel('travel')} className="button bg-blue-500 text-white font-bold py-2 px-4 rounded">Travel</button>
            <button onClick={()=>scrollToTravel('more')} className="button bg-blue-500 text-white font-bold py-2 px-4 rounded">More</button> */}
            
            {allOffersWithDetails && (
                <div>
                    {carouselCards()}
                </div>
            )}
            <FooterContainer />
        </div>
    );
};


export default Offers;

