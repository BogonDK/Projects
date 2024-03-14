import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import PageHeader from "../../../components/PageHeader/PageHeader";
import { FooterContainer } from "../../../containers/footer";
import { getOfferDetails } from "../../../actions/offersAction";
import { getCustomerDetails, redeemOffer, saveOfferToCustomer, getBusinessDetails } from "../../../actions/customerAction";
import styles from './SavedOffers.css';

const SavedOffers = () => {
    const navigate = useNavigate();

    const [savedOffers, setSavedOffers] = useState(null);
    const [redeemedOffers, setRedeemedOffers] = useState(null);
    const [savedOfferIds, setSavedOfferIds] = useState(null);
    const [redeemedOfferIds, setRedeemedOfferIds] = useState(null);

    const userId = JSON.parse(localStorage.getItem('userProfile')).id;

    useEffect(() => {
        const loadAllOffers = async () => {
            const userInfo = await getCustomerDetails(userId);
            const saved = [...new Set(userInfo.saved)];
            const redeemed = [...new Set(userInfo.redeemed)];
            const filteredSaved = saved.filter(offer => !redeemed.includes(offer));
            setSavedOfferIds(filteredSaved);
            setRedeemedOfferIds(redeemed);
            const savedOffersDetails = await Promise.all(filteredSaved.map(async (offerID) => {
                const offerDetails = await getOfferDetails(offerID);
                const businessID = offerDetails.businessId;
                const businessDetails = await getBusinessDetails(businessID);
                const businessName = businessDetails.businessName;
                const data = {
                    id: offerDetails._id,
                    businessName: businessName,
                    title: offerDetails.title,
                    description: offerDetails.description,
                    code: offerDetails.offerCode,
                    startDate: offerDetails.startDate,
                    endDate: offerDetails.endDate,
                };
                return data;
            }));
            const redeemedOffersDetails = await Promise.all(redeemed.map(async (offerID) => {
                const offerDetails = await getOfferDetails(offerID);
                const businessID = offerDetails.businessId;
                const businessDetails = await getBusinessDetails(businessID);
                const businessName = businessDetails.businessName;
                const data = {
                    id: offerDetails._id,
                    businessName: businessName,
                    title: offerDetails.title,
                    description: offerDetails.description,
                    code: offerDetails.offerCode,
                    startDate: offerDetails.startDate,
                    endDate: offerDetails.endDate,
                };
                return data;
            }));
            setSavedOffers(savedOffersDetails.reverse());
            setRedeemedOffers(redeemedOffersDetails.reverse());
        };
        loadAllOffers();
    }, []);

    const redeemThisOffer = async (offerId) => {
        await redeemOffer(userId, offerId);
        window.location.reload();
    };

    const removeThisOffer = async (offerId) => {
        await saveOfferToCustomer(userId, offerId);
        window.location.reload();
    };

    const renderCards = (offerDetailsArray, type) => {
        return (
            offerDetailsArray.map((offer) => {
                const startDate = (new Date(offer.startDate)).toDateString();
                const endDate = (new Date(offer.endDate)).toDateString();
                return (
                    <div className="saved-offers-card" >
                        <div className="saved-offers-card-inner-container">
                            <div>
                                <h5 className="saved-offers-card-title">{offer.title}</h5>
                                <div className="saved-offers-card-store">{offer.businessName}</div>
                                <div className="saved-offers-card-dates">
                                    <h5>Available: {startDate}</h5>
                                    <h5>Expires: {endDate}</h5>
                                </div>
                            </div>
                            {type === 'redeemed' && 
                                <div className="saved-offers-card-buttons-container">
                                    <h5 className="saved-offers-card-code">Code: {offer.code}</h5>
                                </div>
                            }
                            {type === 'saved' &&
                                <div className="saved-offers-card-buttons-container">
                                    <button className="saved-offers-card-redeem-button" onClick={() => {redeemThisOffer(offer.id)}}>Redeem</button>
                                    <button className="saved-offers-card-remove-button" onClick={() => {removeThisOffer(offer.id)}}>Remove</button>
                                </div>
                            }
                        </div>
                    </div>
                );
            })
        );
    };

    return (
        <div>
            <PageHeader screen={'/savedoffers'}/>
            <div className="saved-offers-title">
                Your saved offers
            </div>
            {savedOffers && redeemedOffers && (
                <div className="saved-offers-containter">
                    <div className="saved-offers-subtitle ">Saved ({savedOfferIds.length})</div>
                    <div className="saved-offers-offers-container">
                        {renderCards(savedOffers, 'saved')}
                    </div>
                    <div className="saved-offers-subtitle ">Redeemed ({redeemedOfferIds.length})</div>
                    <div className="saved-offers-offers-container">
                        {renderCards(redeemedOffers, 'redeemed')}
                    </div>
                </div>
            )}
            <FooterContainer/>
        </div>
    );
};

export default SavedOffers;
