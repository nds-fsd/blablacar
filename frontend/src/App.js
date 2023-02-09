import './App.css';
import { NewUser } from './components/newUser/newUser';
import {NewTrip} from './components/newTrip/newTrip'
import {Login} from './components/login/login';
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import {ErrorForm} from './components/ErrorForm/ErrorForm';
import {FindTrip} from './components/findTrip/findTrip';
import {FindUser} from './components/findUser/findUser';
import { TripList } from "./components/ListTrips/ListTrips";
import { UsersList } from "./components/ListUsers/ListUsers";
import Navigation from './components/Navbar/Navigation';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import React, { useState } from 'react';
import TripSearchBar from './components/TripSearchBar/tripSearchBar';
import Modal from './modal/modal';
import ChoseModal from './modal/choseModal';
import Parallax from './components/parallax/parallax';
import ProfileAccount from './components/ProfileAccount/ProfileAccount';


function App(props) {
  
  const location = useLocation();
  const background = location.state && location.state.background;
  
  const [openModal, setOpenModal] = useState(false);
  const [whatModal, setWhatModal] = useState('');
console.log("openModal", openModal)
console.log("whatModal", whatModal)
  return (
    <div>
      <Navigation setOpenModal={setOpenModal} setWhatModal={setWhatModal}/>
      <Routes>
          <Route path="/" element={<Parallax />}/>
          <Route path="users" element={<ChoseModal openModal={openModal} whatModal={whatModal} setOpenModal={setOpenModal}/>}/>
          <Route path="login" element={<Login />}/>
          <Route path="trips" element={<ProtectedRoute openModal={openModal} whatModal={whatModal} setOpenModal={setOpenModal}/>}>
            <Route path="" element={<ChoseModal openModal={openModal} whatModal={whatModal} setOpenModal={setOpenModal}/>}/>
          </Route>
          <Route path="trips/searchresults" element={<FindTrip/>}/>
          <Route path="error" element={<ErrorForm />}/>
          <Route path="users/list" element={<ProtectedRoute/>}>
            <Route path="" element={<UsersList />}/>
          </Route>
          <Route path="users/list" element={<UsersList />} />
          <Route path="search" element={<TripSearchBar />} />
          <Route path="profile" element={<ProtectedRoute/>}>
            <Route path="" element={<ProfileAccount />}/>
          </Route>
          <Route path="*" element={<ErrorForm />} />
      </Routes>
    </div>
  );
}

export default App;
