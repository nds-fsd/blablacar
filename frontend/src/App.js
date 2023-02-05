import './App.css';
import { NewUser } from './components/newUser/newUser';
import {NewTrip} from './components/newTrip/newTrip'
import {Login} from './components/login/login';
import { Outlet, Route, Routes } from "react-router-dom";
import {ErrorForm} from './components/ErrorForm/ErrorForm';
import {FindTrip} from './components/findTrip/findTrip';
import {FindUser} from './components/findUser/findUser';
import { TripList } from "./components/ListTrips/ListTrips";
import { UsersList } from "./components/ListUsers/ListUsers";
import Navigation from './components/Navbar/Navigation';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import React from 'react';
import TripSearchBar from './components/TripSearchBar/tripSearchBar';
import Parallax from './components/parallax/parallax';
import ProfileAccount from './components/ProfileAccount/ProfileAccount';


function App(props) {
  
  return (
    <div>
      <Navigation/>
      <Routes>
          <Route path="/" element={<Parallax />}/>
          <Route path="users" element={<NewUser />}/>
          <Route path="login" element={<Login />}/>
          <Route path="trips" element={<ProtectedRoute/>}>
            <Route path="" element={<NewTrip />}/>
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
