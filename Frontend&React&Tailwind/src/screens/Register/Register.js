import React, { useState } from "react";
import Geocode from "react-geocode";
import PageHeader from "../../components/PageHeader/PageHeader";
import DefaultButton from "../../components/DefaultButton/DefaultButton";
import { useNavigate } from 'react-router-dom';
import { FooterContainer } from '../../containers/footer';
import { registerNewCustomer, registerNewBusiness } from "../../actions/authenticationAction";
import { saveUserLocally } from "../../localStorage/localStorageUtils"; 
import styles from './Register.css';

const Register = () => {

    const navigate = useNavigate();

    const [registerType, setRegisterType] = useState('customer');

    const onChangeRegisterType = (type) => {
        setRegisterType(type);
    };

    const onRegister = async () => {
        // Get the latitude and longitude of the business
        const getLatLong = async () => {
            const address = document.getElementById("businessaddress").value;
            const latLong = [];
            if (address) {
                Geocode.setApiKey("AIzaSyCoJ2dosqQree0ARyQ5Isa9XPUt_6CcoRg");
                await Geocode.fromAddress(address).then(
                    (response) => {
                        const { lat, lng } = response.results[0].geometry.location;
                        latLong.push(lat);
                        latLong.push(lng);
                    },
                    (error) => {
                        console.error(error);
                    }
                );
            }
            return latLong;
        }

        const data = registerType === 'customer' ? {
            firstName: document.getElementById("firstname").value,
            lastName: document.getElementById("lastname").value,
            email: document.getElementById("email").value,
            phoneNumber: document.getElementById("phonenumber").value,
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
        } : {
            firstName: document.getElementById("firstname").value,
            lastName: document.getElementById("lastname").value,
            storename: document.getElementById("businessname").value,
            category: document.getElementById("businesscategory").value,
            address: address,
            latLong: await getLatLong(),
            email: document.getElementById("email").value,
            phoneNumber: document.getElementById("phonenumber").value,
            username: document.getElementById("username").value,
            password: document.getElementById("password").value,
        };

        // console.log('Data being sent to post request:', data);
        if (registerType === 'customer') {
            const newUser = await registerNewCustomer(data);
            saveUserLocally(newUser);
        } else {
            const newUser = await registerNewBusiness(data);
            saveUserLocally(newUser);
        }

        navigate('/offers');

    };

    return (
        <div>
            <PageHeader screen={'/register'}/>
            <div className="title">
                <label>Register your account</label>
            </div>
            <div className="below-title">
                <div className="main-container">
                    <div className="labels">
                        <label>First name:</label>
                        <label>Last name:</label>
                        {registerType === 'business' && <label>Store name:</label>}
                        {registerType === 'business' && <label>Store category:</label>}
                        {registerType === 'business' && <label>Address:</label>}
                        <label>Email address:</label>
                        <label>Phone number:</label>
                        <label>Username:</label>
                        <label>Password:</label>
                    </div>
                    <div className="inputs">
                        <input type="text" id="firstname"/>
                        <input type="text" id="lastname"/>
                        {registerType === 'business' && <input type="text" id="businessname"/>}
                        {registerType === 'business' &&
                            <select id="businesscategory">
                                <option value="">--Please select a category--</option>
                                <option value="home">Home</option>
                                <option value="food">Food</option>
                                <option value="retail">Retail</option>
                                <option value="beauty">Beauty</option>
                                <option value="travel">Travel</option>
                                <option value="recreation">Recreation</option>
                                <option value="finance">Finance</option>
                                <option value="auto">Auto</option>
                                <option value="health">Health</option>
                                <option value="technology">Technology</option>
                                <option value="miscellaneous">Miscellaneous</option>
                            </select>}
                        {registerType === 'business' && <input type="text" id="businessaddress" />}
                        <input type="text" id="email"/>
                        <input type="text" id="phonenumber"/>
                        <input type="text" id="username"/>
                        <input type="text" id="password"/>
                    </div>
                </div>
            </div>
            <div className='register-type'>
                <button 
                    className='register-type-button'
                    onClick={() => onChangeRegisterType('customer')}
                    style={{
                        backgroundColor: registerType === 'customer' ? 
                        '#655AE9' : 'white',
                        color: registerType === 'customer' ? 
                        'white' : '#655AE9'
                    }}
                >
                    Customer
                </button>
                <button 
                    className='register-type-button'
                    onClick={() => onChangeRegisterType('business')}
                    style={{ 
                        backgroundColor: registerType === 'business' ? 
                        '#655AE9' : 'white',
                        color: registerType === 'business' ? 
                        'white' : '#655AE9'
                    }}
                >
                    Business
                </button>
            </div>
            <DefaultButton
                text={'Register'}
                onPress={onRegister}
                disabled={false}
            />
            <FooterContainer />
        </div>
    );
};

export default Register;