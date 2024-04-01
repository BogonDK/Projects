export const saveUserLocally = (userData) => {
    console.log('Saving user data locally:', userData);
    localStorage.setItem("userProfile", userData);
    localStorage.setItem("loggedIn", true);
};

export const clearUserLocally = () => {
    localStorage.setItem("userProfile", null);
    localStorage.setItem("loggedIn", false);
};

export const saveAllOfferIDsLocally = (offersData) => {
    console.log('All offer IDs:', offersData);
    localStorage.setItem("allOfferIDs", offersData);
};