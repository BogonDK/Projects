import axios from 'axios';

export const getBusinessDetails = async (businessID) => {
    const data = {
        id: businessID,
    };

    const response = await axios.post(
        "http://localhost:8080/CustomerUsers/BusinessDetails/", 
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

    return await response.data;
};

export const saveOfferToCustomer = async (userID, offerID) => {
    const data = {
        userId: userID,
        offerId: offerID,
    };

    const response = await axios.put(
        "http://localhost:8080/CustomerUsers/Saved/", 
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

    return await response.data;
};

export const redeemOffer = async (userID, offerID) => {
    const data = {
        userId: userID,
        offerId: offerID,
    };

    const response = await axios.put(
        "http://localhost:8080/CustomerUsers/Redeem/", 
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

    return await response.data;
};

export const getCustomerDetails = async (userID) => {
    const data = {
        userId: userID,
    };

    const response = await axios.post(
        "http://localhost:8080/CustomerUsers/CustomerDetails/", 
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

    return await response.data;
}