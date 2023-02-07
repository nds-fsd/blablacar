import './App.css';

import Home from './components/home/home';
import { NewUser } from './components/newUser/newUser';
import {NewTrip} from './components/newTrip/newTrip'
import {Login} from './components/login/login';
import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import {ErrorForm} from './components/ErrorForm/ErrorForm';
import {FindTrip} from './components/findTrip/findTrip';
import {FindUser} from './components/findUser/findUser';
import { TripList } from "./components/ListTrips/ListTrips";
import { UsersList } from "./components/ListUsers/ListUsers";
import Navbar from './components/Navbar/Navbar';
import { AuthContextProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import React, { useState } from 'react';
import TripSearchBar from './components/TripSearchBar/tripSearchBar';
import Modal from './modal/modal';
import ChoseModal from './modal/choseModal';
function App(props) {

  
  const [openModal, setOpenModal] = useState(false);
  const {whatModal, setWhatModal} = useState('');
  return (
    <div>
      <AuthContextProvider>
      <Navbar setOpenModal={setOpenModal} setWhatModal={setWhatModal}/>
      <ChoseModal openModal={openModal} whatModal={whatModal} setOpenModal={setOpenModal}/>
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="users" element={<ChoseModal openModal={openModal} whatModal={whatModal} setOpenModal={setOpenModal}/>}/>
          <Route path="login" element={<Login />}/>
          <Route path="trips" element={<ProtectedRoute/>}>
            <Route path="" element={<ChoseModal openModal={openModal} whatModal={whatModal} setOpenModal={setOpenModal}/>}/>
          </Route>
          <Route path="trips/searchresults" element={<FindTrip/>}/>
          <Route path="error" element={<ErrorForm />}/>
          <Route path="users/list" element={<ProtectedRoute/>}>
            <Route path="" element={<UsersList />}/>
          </Route>
          <Route path="users/list" element={<UsersList />} />
          <Route path="search" element={<TripSearchBar />} />
          <Route path="*" element={<ErrorForm />} />    
      </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;
