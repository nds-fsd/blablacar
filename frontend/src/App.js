import './App.css';
import Home from './components/home/home';
import { NewUser } from './components/newUser/newUser';
import {NewTrip} from './components/newTrip/newTrip'
import {Login} from './components/login/login';
import { Outlet, Route, Routes } from "react-router-dom";
import {ErrorForm} from './components/ErrorForm/ErrorForm';
import {FindTrip} from './components/findTrip/findTrip';
import {FindUser} from './components/findUser/findUser';
import { TripList } from "./components/ListTrips/ListTrips";
import { UsersList } from "./components/ListUsers/ListUsers";
import Navbar from './components/Navbar/Navbar';
import TripSearchBar from './components/TripSearchBar/tripSearchBar';
function App(props) {
  return (
    <div>
      <Navbar/>
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="users" element={<NewUser />}/>
          <Route path="login" element={<Login />}/>
          <Route path="trips" element={<NewTrip />}/>
          <Route path="trips/searchresults" element={<FindTrip  />}/>
          <Route path="error" element={<ErrorForm />}/>
          <Route path="users/list" element={<UsersList />} />
          <Route path="search" element={<TripSearchBar />} />
          <Route path="*" element={<ErrorForm />} />
          
      </Routes>
      <Outlet />
    </div>
  );
}

export default App;
