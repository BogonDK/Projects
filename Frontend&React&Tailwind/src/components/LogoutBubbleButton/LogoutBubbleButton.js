import React from "react";
import Icon from '../../images/logout-icon.png';
import { useNavigate } from 'react-router-dom';
import { clearUserLocally } from "../../localStorage/localStorageUtils";
import styles from './LogoutBubbleButton.css';

const LogoutBubbleButton = () => {
    const navigate = useNavigate();

    const onLogout = () => {
        clearUserLocally();
        navigate('/login')
    };

    return (
        <div className='bubble-container cursor-pointer'>
            <img src={Icon} className='logout-icon' onClick={()=> onLogout()}/>
        </div>
    );
};

export default LogoutBubbleButton;