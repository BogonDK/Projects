import axios from 'axios';

// Get dashbaord info
export const getDashboard = async (businessId) => {

    const data = {
        id: businessId,
    };
    const response = await axios.post(
        "http://localhost:8080/BusinessUsers/DashboardInfo/",
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
    
    const dashboardData = JSON.stringify(await response.data);

    
    return dashboardData
    
};


// Get dashbaord info
export const getTable = async (businessId) => {

    const data = {
        id: businessId,
    };
    const response = await axios.post(
        "http://localhost:8080/BusinessUsers/Analytics/",
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
    
    const tableData = JSON.stringify(await response.data);

    //console.log('Response data:', dashboardData)
    return tableData
    
};


// Get dashbaord info
export const getOffer = async (offerId) => {

    const data = {
        id: offerId,
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
    
    const dashboardData = JSON.stringify(await response.data);

    
    return dashboardData
    
};

// Delete offer
export const deleteOffer = async (offerInfo) => {
    const data = {
        offerId: offerInfo.offerId,
    }

    const response = await axios.delete(
        "http://localhost:8080/BusinessUsers/DeleteOffer/",
        {
            data,
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