import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// Pages ------------------------------------------------------------------
import Map from './screens/CustomerScreens/map';
import Offers from './screens/CustomerScreens/Offers/Offers';
import Login from './screens/Login/Login';
import Register from './screens/Register/Register';
import CreateOffer from './screens/BusinessScreens/CreateOffer/CreateOffer';
import EditOffer from './screens/BusinessScreens/EditOffer/EditOffer';
import Calendar from './screens/BusinessScreens/Calendar/Calendar';
import UserProfile from './screens/CustomerScreens/UserProfile/UserProfile';
import Storefront from './screens/CustomerScreens/Storefront/Storefront';
import CouponDetail from './screens/BusinessScreens/CouponDetail/CouponDetail';
import OfferDetails from './screens/CustomerScreens/OfferDetails/OfferDetails';
import SavedOffers from './screens/CustomerScreens/SavedOffers/SavedOffers';
import './App.css';

function App() {

  const [serverData, setServerData] = useState([{}]);

  useEffect(() => {
    const fetchData = async () => {
      await axios.get("/api").then((response) => { 
        setServerData(response.data);
        console.log('Response:', response.data);
      });
    };
    fetchData();
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/register' element={<Register/>} />
          <Route exact path='/map' element={<Map />} />
          <Route exact path='/offers' element={<Offers />} />
          <Route exact path='/createoffer' element={<CreateOffer />} />
          <Route exact path='/editoffer/:id' element={<EditOffer />} />
          <Route exact path='/calendar' element={<Calendar />} />
          <Route exact path='/userprofile' element={<UserProfile/>} />
          <Route exact path='/storefront' element={<Storefront/>} />
          <Route exact path='/coupondetail' element={<CouponDetail/>} />
          <Route exact path='/offerdetails' element={<OfferDetails/>} />
          <Route exact path='/savedoffers' element={<SavedOffers/>}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
