import axios from 'axios';


// Create a new offer
export const createNewOffer = async (offerInfo) => {
    
    const data = new FormData();
    data.append('title', offerInfo.title);
    data.append('businessId', offerInfo.businessId);
    data.append('startDate', offerInfo.startDate);
    data.append('endDate', offerInfo.endDate);
    data.append('description', offerInfo.description);
    data.append('offerCode', offerInfo.offerCode);
    data.append('offerImage', offerInfo.offerImage);
    console.log('data', data)
    const response = await axios.post(
        "http://localhost:8080/BusinessUsers/CreateOffer",
        data,
        {
            headers: {
                'Content-Type': 'application/multipart/form-data',
            },
        },
    )
    console.log('Response', response)
    console.log('Response data:', response.data)
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


// Update an offer
export const updateOffer = async (offerInfo) => {
    const data = new FormData();
    data.append('title', offerInfo.title);
    data.append('offerId',offerInfo.offerId);
    data.append('startDate', offerInfo.startDate);
    data.append('endDate', offerInfo.endDate);
    data.append('description', offerInfo.description);
    data.append('offerCode', offerInfo.offerCode);
    data.append('offerImage', offerInfo.offerImage);

    console.log("data", data)
    const response = await axios.post(
        "http://localhost:8080/BusinessUsers/UpdateOffer",
        data,
        {
            headers: {
                'Content-Type': 'application/multipart/form-data',
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

// Get all offers
export const getAllOffers = async () => {
    const response = await axios.get(
        "http://localhost:8080/BusinessUsers/AllOffers/",
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

export const getOfferDetails = async (offerID) => {
    const data = {
        id: offerID,
    };

    const response = await axios.post(
        "http://localhost:8080/BusinessUsers/OfferInfo/", 
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