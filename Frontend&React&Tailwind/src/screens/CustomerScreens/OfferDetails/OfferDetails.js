import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
import { getOfferDetails } from "../../../actions/offersAction";
import PageHeader from "../../../components/PageHeader/PageHeader";
import { FooterContainer } from "../../../containers/footer";
import DefaultButton from "../../../components/DefaultButton/DefaultButton";
import { saveOfferToCustomer } from "../../../actions/customerAction";
import styles from './OfferDetails.css';

const OfferDetails = () => {
    const navigate = useNavigate();

    const params = useLocation();
    const offerID = params.state.offerID;
    const businessID = params.state.businessID;
    const businessName = params.state.businessName;

    const [offerDetails, setOfferDetails] = useState(null);
    const [saveButton, setSaveButton] = useState('Save');

    useEffect(() => {
        const loadOfferDetails = async () => {
            const offerInfo = await getOfferDetails(offerID);
            setOfferDetails(offerInfo);
        };
        loadOfferDetails();
    }, []);

    const goToStoreFront = () => {
        navigate('/storefront', { state: 
			{ 
				businessID: businessID,
			}
		});
    };

    const saveOfferToUser = async () => {
        const userId = JSON.parse(localStorage.getItem('userProfile')).id;
        await saveOfferToCustomer(userId, offerID);
        if (saveButton === 'Save') {
            setSaveButton('Remove');
        } else if (saveButton === 'Remove') {
            setSaveButton('Save');
        };
    };

    return (
        <div>
            <PageHeader screen={'/offerdetails'} />
            <label className="offer-details-page-label">Offer details</label>
            <div className="hl"></div>
            {offerDetails && (
                <div className="offer-details-screen">
                <div className="offer-details-left-vl">
                    <div className="offer-details-info-box">
                        <div className='offer-data'>
                            <div className="offer-details-offer-name">{offerDetails.title}</div>
                            <label>{offerDetails.description}</label>
                            <label>Available on: <b>{new Date(offerDetails.startDate).toDateString()}</b></label>
                            <label>Expires on: <b>{new Date(offerDetails.endDate).toDateString()}</b></label>
                        </div>
                    </div>
                    <div className="offer-details-save-button">
                        <DefaultButton
                            text={saveButton}
                            onPress={saveOfferToUser}
                        />
                    </div>
                </div>
                <div className="vl"></div>
                <div className="offer-details-right-of-vl">
                    <div className="offer-details-store-name">{businessName}</div>
                    <label>Want to see more offers from this store?</label>
                    <div className="offer-details-store-button">
                        <DefaultButton
                            text={'See more'}
                            onPress={goToStoreFront}
                        />
                    </div>
                </div>
            </div>
            )}
            <FooterContainer/>
        </div>
    );
};

export default OfferDetails;