import React from 'react';
import PageHeader from '../../components/PageHeader/PageHeader';
import ShoppingPic from '../../images/login-temp.jpg';
import styles from './Login.css';
import { FooterContainer } from '../../../containers/footer';

const Login = () => {


    return (
        <div>
            <PageHeader screen={'/businesslogin'}/>
            <div className='below-header'>
                <div className='info-container'>
                    <ul className='users'>
                        <li><a href='./BusinessLogin'>Partner</a></li>
                        <li><a href='./Login'>Customer</a></li>
                    </ul>
                    <div className='label-input-container'>
                        <label>
                            User ID
                        </label>
                        <input className='input-field' type="text" name="userId" />
                    </div>
                    <div className='label-input-container'>
                        <label>
                            Password
                        </label>
                        <input className='input-field' type="text" name="password" />
                    </div>
                   
                        <div className="container">
                            <label>Rememeber Me</label>
                            <input type="checkbox" checked="checked"/>   
                            <span className="checkmark"></span>
                            <button>Forgot Password?</button>
                        </div>
                        <ul className='register'>
                        <li><a href='./BusinessRegister'>Register</a></li>
                        </ul>
                    <button className='sign-in'>Sign in</button>
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
