import React, { Fragment, useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import PageHeader from '../../../components/PageHeader/PageHeader';
import { FooterContainer } from '../../../containers/footer';
import { getBusinessDetails, getCustomerDetails, saveOfferToCustomer } from "../../../actions/customerAction";
import { getOfferDetails } from "../../../actions/offersAction";
import lunch from '../../../images/temp-lunch.jpg';
import beauty from '../../../images/temp-beauty.jpg';
import home from '../../../images/temp-home.jpg';
import retail from '../../../images/temp-retail.jpg';
import other from '../../../images/temp-other.jpg';
import Geocode from "react-geocode";
import styles from './Storefront.css';
import EmbeddedMap from "../../../components/EmbeddedMap";

const Storefront = () => {
    const navigate = useNavigate();

    const params = useLocation();
    const businessID = params.state.businessID;

    const [businessDetails, setBusinessDetails] = useState(null);
    const [businessOffers, setBusinessOffers] = useState(null);
    const [savedOffers, setSavedOffers] = useState(null);
    const [redeemedOffers, setRedeemedOffers] = useState(null);

    const userId = JSON.parse(localStorage.getItem('userProfile')).id;

    useEffect(() => {
        const loadBusinessDetails = async () => {
            const userInfo = await getCustomerDetails(userId);
            const saved = [...new Set(userInfo.saved)];
            const redeemed = [...new Set(userInfo.redeemed)];
            setSavedOffers(saved);
            setRedeemedOffers(redeemed);

            const businessInfo = await getBusinessDetails(businessID);
            const offersArray = businessInfo.offers;
            const offerDetailsArray = await Promise.all(offersArray.map(async (offerID) => {
                const details = await getOfferDetails(offerID);
                return details;
            }));
            setBusinessOffers(offerDetailsArray);
            setBusinessDetails(businessInfo);
        };
        loadBusinessDetails();
    }, []);

    // Add address if none is given and we have the latLong
    useEffect(() => {
        if (businessDetails && !businessDetails.address && businessDetails.latLong) {
            const getAddress = async (latLong) => {
                Geocode.setApiKey("AIzaSyCoJ2dosqQree0ARyQ5Isa9XPUt_6CcoRg");
                await Geocode.fromLatLng(latLong[0], latLong[1]).then(
                    (response) => {
                        let address = response.results[0].formatted_address;
                        const newBusinessDetails = { ...businessDetails };
                        newBusinessDetails.address = address;
                        setBusinessDetails(newBusinessDetails);
                    },
                    (error) => {
                        console.error(error);
                    }
                );
            };
            getAddress(businessDetails.latLong);
        }
    }, [businessDetails]);

    const getCategoryImage = (category) => {
		if (category === 'food') {
			return lunch;
		} else if (category === 'home') {
			return home;
		} else if (category === 'beauty') {
			return beauty;
		} else if (category === 'retail') {
			return retail;
		} else {
			return other;
		};
	};

    const saveOffer = async (offerID) => {
        await saveOfferToCustomer(userId, offerID);
        navigate('/savedoffers');
    };

    const splitAddress = (address) => {
        const splitIndex = address.indexOf(",");
        const firstAddress = address.slice(0, splitIndex + 1);
        const secondAddress = address.slice(splitIndex + 2);
        return [firstAddress, secondAddress];
    };

    const offers = () => {
        return (  
            businessOffers.map((offer) => {
                const offerId = offer._id;
                let buttonText = 'Save';
                if (savedOffers.includes(offerId)) {
                    buttonText = 'Saved';
                } else if (redeemedOffers.includes(offerId)) {
                    buttonText = 'Redeemed';
                };
                const startDate = (new Date(offer.startDate)).toDateString();
                const endDate = (new Date(offer.endDate)).toDateString();
                return (
                    <button className="store-front-card" >
                        <div class="w-full max-w-sm bg-g border border-gray-400 rounded-lg shadow">
                            <div className='pic'>
                                <img src={getCategoryImage(businessDetails.category)}/>
                            </div>
                            <div className="px-5 pb-3">
                                <a href="#">
                                    <h5 className="text-lg font-semibold tracking-tight text-gray-900">{offer.title}</h5>
                                    <h5 className="text-xs font-semibold tracking-tight text-gray-500">Available: {startDate}</h5>
                                    <h5 className="text-xs font-semibold tracking-tight text-gray-500">Expires: {endDate}</h5>
                                    {buttonText === 'Save' && (
                                        <button 
                                            className="store-front-save-button" 
                                            onClick={() => {
                                                saveOffer(offerId);
                                                
                                            }}
                                        >
                                            {buttonText}
                                        </button>
                                    )}
                                    {buttonText === 'Saved' && (
                                        <div className="store-front-saved-button">
                                            {buttonText}
                                        </div>
                                    )}
                                    {buttonText === 'Redeemed' && (
                                        <div className="store-front-redeemed-button">
                                            {buttonText}
                                        </div>
                                    )}
                                </a>
                            </div>
                        </div>
                    </button>
                );
            })
        );
    };

    return (
        <div>
        <PageHeader screen={'/storefront'}/>
            {businessDetails && businessOffers && (
                <div className="store-front">
                    <div className="store-front-details-container">
                        <div className="flex flex-row">
                            <img className="store-front-img" src={businessDetails.profileImage}/>
                            <div>
                                <h3 className="store-front-name">{businessDetails.businessName}</h3>
                                <div className="store-front-address flex flex-col text-left">
                                    <p>{businessDetails && businessDetails.address ? splitAddress(businessDetails.address)[0] : ""}</p>
                                    <p>{businessDetails && businessDetails.address ? splitAddress(businessDetails.address)[1] : ""}</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex-1 ml-[1rem]">
                            <EmbeddedMap navigate={navigate} storefrontId={businessID} />
                        </div>
                    </div>
                    <div className="store-front-hl"></div>
                    <i className="store-front-body">Find great deals on your favorite {businessDetails.category} items!</i>
                    <div className="store-front-cards">
                        {offers()}
                    </div>
                </div>
            )}
            <FooterContainer/>
        </div>
    );
};

export default Storefront;