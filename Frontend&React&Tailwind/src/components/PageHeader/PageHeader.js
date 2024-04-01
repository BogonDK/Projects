import React, { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import AllyOffersLogo from "../AllyOffersLogo/AllyOffersLogo";
import IconBubbleButton from "../IconBubbleButton/IconBubbleButton";
import MapIconButton from "../MapBubbleButton/MapBubbleButton";
import LogoutBubbleButton from "../LogoutBubbleButton/LogoutBubbleButton";
import BookmarkIcon from "../BookmarkButton/BookmarkButton";
import { useNavigate } from 'react-router-dom';
import styles from './PageHeader.css';

const PageHeader = ({ screen }) => {
    const navigate = useNavigate();

    const [loginStatus, setLoginStatus] = useState(null);
    const [userType, setUserType] = useState(null);

    const goToDashboardScreen = () => {
        if (loginStatus && userType) {
            userType === "business" ? navigate('/calendar') : navigate('/offers');
        };
    };

    useEffect(() => {
        const initializeValues = () => {
            setLoginStatus(localStorage.getItem("loggedIn"));
            const userProfile = localStorage.getItem("userProfile");
            const loginType = userProfile !== 'null' ? 
                JSON.parse(userProfile).type : 'nothing';
            setUserType(loginType);
            console.log('screen name:', screen)
            console.log('login status:', loginStatus)
            console.log('UserType', userType)
        };
        try {
            // Set values if they exist in local storage
            initializeValues();
        } catch(error) {
            // Do nothing
        }
    }, []);

    return (
        <div className='header'>
            <div
                onClick={goToDashboardScreen}
                className="cursor-pointer"
            >
                <AllyOffersLogo/>
            </div>
            <div className='bubble-buttons'>
                {loginStatus && screen !== '/login' && screen !== '/register' && (
                    <div>
                        {userType === 'customer' && (
                            <div className='customer-bubble-buttons'>
                                <MapIconButton/>
                                <BookmarkIcon/>
                                <IconBubbleButton/>
                            </div>
                        )}
                    </div>
                )}
                {screen !== '/login' && screen !== '/register' && (
                    <LogoutBubbleButton/>
                )}
            </div>
        </div>
    );
};

PageHeader.propTypes = {
    screen: PropTypes.string,
};

export default PageHeader;