import React from "react";
import Icon from '../../images/map-icon.png';
import { useNavigate } from 'react-router-dom';
import styles from './MapBubbleButton.css';

const MapBubbleButton = () => {
    const navigate = useNavigate();

    return (
        <div className='bubble-container cursor-pointer'>
            <img src={Icon} className='icon' onClick={()=> navigate('/map')}/>
        </div>
    );
};

export default MapBubbleButton;