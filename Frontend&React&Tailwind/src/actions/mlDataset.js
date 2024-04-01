import axios from 'axios';


export const getInputData = async (userId) => {
    const data = {
        userId: userId,
    };
    const response = await axios.post(
        "http://localhost:8080/CustomerUsers/MlData/",
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
    
    const inputData = await response.data;

    
    return inputData
    
};