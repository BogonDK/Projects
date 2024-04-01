import axios from 'axios';

export const customerLogin = async (userInfo) => {
    const data = {
        username: userInfo.username,
        password: userInfo.password,
    };
    const response = await axios.post(
        "http://localhost:8080/CustomerUsers/CustomerLogin",
        data,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        },
    )
    .catch((error) => {
        if (error.response) {
            console.log('Server responded with status code:', error.response.status);
            console.log('Response data:', error.response.data);
        } else if (error.request) {
            console.log('No response received:', error.request);
        } else {
            console.log('Error creating request:', error.message);
        }
    });
    console.log('Response data:', await response.data)
    console.log(await response)
    return await response.data;
};

export const businessLogin = async (userInfo) => {
    const data = {
        username: userInfo.username,
        password: userInfo.password,
    };
    const response = await axios.post(
        "http://localhost:8080/BusinessUsers/BusinessLogin",
        data,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        },
    )
    .catch((error) => {
        if (error.response) {
            console.log('Server responded with status code:', error.response.status);
            console.log('Response data:', error.response.data);
        } else if (error.request) {
            console.log('No response received:', error.request);
        } else {
            console.log('Error creating request:', error.message);
        }
    });
    console.log('Response data:', await response.data)
    return await response.data;
};

// Register a new customer user
export const registerNewCustomer = async (userInfo) => {
    const data = {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        phoneNumber: userInfo.phoneNumber,
        username: userInfo.username,
        password: userInfo.password
    }

    const response = await axios.post(
        "http://localhost:8080/CustomerUsers/CustomerRegister",
        data,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        },
    )
    .catch((error) => {
        if (error.response) {
            console.log('Server responded with status code:', error.response.status);
            console.log('Response data:', error.response.data);
        } else if (error.request) {
            console.log('No response received:', error.request);
        } else {
            console.log('Error creating request:', error.message);
        }
    });
    console.log('Response data:', await response.data)
    return await response.data;
};

export const registerNewBusiness = async (userInfo) => {
    const data = {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        businessName: userInfo.storename,
        category: userInfo.category,
        address: userInfo.address,
        lat: userInfo?.latLong[0],
        lng: userInfo?.latLong[1],
        email: userInfo.email,
        phoneNumber: userInfo.phoneNumber,
        username: userInfo.username,
        password: userInfo.password
    }

    const response = await axios.post(
        "http://localhost:8080/BusinessUsers/BusinessRegister",
        data,
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        },
    )
    .catch((error) => {
        if (error.response) {
            console.log('Server responded with status code:', error.response.status);
            console.log('Response data:', error.response.data);
        } else if (error.request) {
            console.log('No response received:', error.request);
        } else {
            console.log('Error creating request:', error.message);
        }
    });
    console.log('Response data:', await response.data)
    return await response.data;
};