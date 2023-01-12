<<<<<<< HEAD
import React from 'react';
import Home from './components/home/home'
import './App.css';


function App() {
  return (
    <div>
      <BrowserRouter>
  <Routes>
    <Route path="/home" element={<Home />} />
  </Routes>
</BrowserRouter>

=======
import './App.css';
import Home from './components/home/home';
import { NewUser } from './components/newUser/newUser';
import {NewTrip} from './components/newTrip/newTrip'
import {Login} from './components/login/login';
import { Outlet, Route, Routes } from "react-router-dom";
import {ErrorForm} from './components/ErrorForm/ErrorForm';
import {FindTrip} from './components/findTrip/findTrip';
import { TripList } from "./components/ListTrips/ListTrips";
import { UsersList } from "./components/ListUsers/ListUsers";
function App(props) {
  console.log(props)
  return (
    <div>
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="users" element={<NewUser />}/>
          <Route path="login" element={<Login />}/>
          <Route path="trips" element={<NewTrip />}/>
          <Route path="trips/find/:origen/:originDate/:destination/:seats" element={<FindTrip  />}/>
          <Route path="error" element={<ErrorForm />}/>
          <Route path="trip/list" element={<TripList />} />
          <Route path="users/list" element={<UsersList />} />
          <Route path="*" element={<ErrorForm />} />
      </Routes>
      <Outlet />
>>>>>>> Sprint1
    </div>
  );
}

export default App;
