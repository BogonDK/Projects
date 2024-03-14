import React from 'react';
import PageHeader from '../../../components/PageHeader/PageHeader';
import { FooterContainer } from '../../../containers/footer';
import { useNavigate } from 'react-router-dom';
import styles from './UserProfile.css';
import icon from '../../../images/profile-icon.png';

const UserProfile = () => {

    const navigate = useNavigate();
    const userData = JSON.parse(localStorage.getItem("userProfile"));

    console.log(userData)

    return (    
        <div>
            <PageHeader screen={'/userprofile'}/>
            <div className='profile-heading'>
                <img src={icon} className='profile-icon'/>
                <label>Welcome, {userData.firstName} {userData.lastName}</label>
            </div>
            <div className='box-container'>
                <div className='profile-info-box'>
                    <div className='info-labels'>
                        <label>Name:</label>
                        <label>User name:</label>
                        <label>Email:</label>
                        <label>Phone number:</label>
                    </div>
                    <div className='user-data'>
                        <label>{userData.firstName} {userData.lastName}</label>
                        <label>{userData.userName}</label>
                        <label>{userData.email}</label>
                        <label>{userData.phoneNumber}</label>
                    </div>
                </div>
            </div>
            <FooterContainer/>
        </div>
    );
};

export default UserProfile;