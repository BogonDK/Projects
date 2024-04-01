const axios = require('axios');

const API_URL = process.env.API_URL;
const API_KEY = process.env.API_KEY;

const data = JSON.stringify({
    "collection": "business",
    "database": "authentication",
    "dataSource": "Cluster0",
    "projection": {
        "_id": 1
    }
});
            
const config = {
    method: 'post',
    url: 'https://data.mongodb-api.com/app/data-dislu/endpoint/data/v1/action/findOne',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Request-Headers': '*',
      'api-key': API_KEY,
    },
    data: data
};
            
axios(config)
    .then(function (response) {
        console.log(JSON.stringify(response.data));
    })
    .catch(function (error) {
        console.log(error);
    });

