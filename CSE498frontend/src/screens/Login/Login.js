import React, { useState } from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import { FooterContainer } from '../../containers/footer';
import ShoppingPic from '../../images/login-temp.jpg';
import DefaultButton from '../../components/DefaultButton/DefaultButton';
import { useNavigate } from 'react-router-dom';
import { customerLogin, businessLogin } from '../../actions/authenticationAction';
import { getAllOffers } from '../../actions/offersAction';
import { saveUserLocally, saveAllOfferIDsLocally } from '../../localStorage/localStorageUtils';
import styles from './Login.css';

const Login = () => {

    const navigate = useNavigate();
    const [loginType, setLoginType] = useState('customer');

    const onChangeLoginType = (type) => {
        setLoginType(type);
    };

    const onLogin = async () => {
        const data = {
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
        };

        if (loginType === 'customer') {
            const userProfile = await customerLogin(data);
            saveUserLocally(JSON.stringify(userProfile));
            const allOffers = await getAllOffers();
            saveAllOfferIDsLocally(allOffers);
        } else {
            const userProfile = await businessLogin(data);
            saveUserLocally(JSON.stringify(userProfile));
        };
        
        navigate(loginType === "customer" ? '/offers' : "/calendar");
    };

    const onRegister = () => {
        navigate('/register');
    }; 

    return (
        <div>
            <PageHeader screen={'/login'}/>
            <div className='below-header'>
                <div className='info-container'>
                    <div className='input-container'>
                        <div className='login-type'>
                            <button 
                                className='login-type-button'
                                onClick={() => onChangeLoginType('customer')}
                                style={{ 
                                    backgroundColor: loginType === 'customer' ? 
                                    '#8A3575' : 'white',
                                    color: loginType === 'customer' ? 
                                    'white' : '#8A3575'
                                }}>
                                Customer
                            </button>
                            <button 
                                className='login-type-button'
                                onClick={() => onChangeLoginType('business')}
                                style={{ 
                                    backgroundColor: loginType === 'business' ? 
                                    '#8A3575' : 'white',
                                    color: loginType === 'business' ? 
                                    'white' : '#8A3575'
                                }}
                            >
                                Business
                            </button>
                        </div>
                        <label>
                            Username
                        </label>
                        <input type="text" id="username" />
                    </div>
                    <div className='input-container'>
                        <label>
                            Password
                        </label>
                        <input type="password" id="password" />
                    </div>
                    <div className="container">
                        <button onClick={onRegister}>Register account</button>
                    </div>
                    <div className='login-button'>
                        <DefaultButton
                            text={'Login'}
                            onPress={onLogin}
                        />
                    </div>
                </div>
                <div className='shopping-pic'>
                    <img src={ShoppingPic}/>
                </div>
            </div>
            <FooterContainer />
        </div>
    );
};

export default Login;
