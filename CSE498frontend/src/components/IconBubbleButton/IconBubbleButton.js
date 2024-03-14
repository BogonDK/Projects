import React from "react";
import Icon from '../../images/account-icon.png';
import { useNavigate } from 'react-router-dom';
import styles from './IconBubbleButton.css';

const IconBubbleButton = () => {
    const navigate = useNavigate();
    
    return (
        <div className='bubble-container cursor-pointer' onClick={()=> navigate('/userprofile')}>
            <img src={Icon} className='icon'/>
        </div>
    );
};


export default IconBubbleButton;