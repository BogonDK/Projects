import React from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import ShoppingPic from '../../images/login-temp.jpg';
import styles from './Login.css';
import { FooterContainer } from '../../../containers/footer';


const Login = () => {


    return (
        <div>
            <PageHeader screen={'/customerregister'}/>
            <div className='below-header'>
                <div className='info-container'>
                    <ul className='users'>
                        <li><a href='./BusinessRegister'>Partner</a></li>
                        <li><a href='./CustomerRegister'>Customer</a></li>
                    </ul>
                    <div className='label-input-container'>
                        <label>
                            Email Address
                        </label>
                        <input className='input-field' type="text" name="email" />
                    </div>
                    <div className='label-input-container'>
                        <label>
                            First Name
                        </label>
                        <input className='input-field' type="text" name="firstName" />
                    </div>
                    <div className='label-input-container'>
                        <label>
                            Last Name
                        </label>
                        <input className='input-field' type="text" name="lastName" />
                    </div>
                    <div className='label-input-container'>
                        <label>
                            Phone Number
                        </label>
                        <input className='input-field' type="text" name="phoneNumber" />
                    </div>
                    <div className='label-input-container'>
                        <label>
                            Username
                        </label>
                        <input className='input-field' type="text" name="userName" />
                    </div>
                    <div className='label-input-container'>
                        <label>
                            Password
                        </label>
                        <input className='input-field' type="text" name="password" />
                    </div>
                        <ul className='sign-in'>
                        <li><a href='./Login'>Sign in</a></li>
                        </ul>
                    <button className='register'>Register</button>
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
