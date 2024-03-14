import React from "react";
import Icon from '../../images/bookmark-icon.png';
import { useNavigate } from 'react-router-dom';
import style from './BookmarkButton.css';

const BookmarkIcon = () => {
    const navigate = useNavigate();
    
    return (
        <div className='bubble-container cursor-pointer' onClick={()=> navigate('/savedoffers')}>
            <img src={Icon} className='bookmark-icon'/>
        </div>
    );
};


export default BookmarkIcon;