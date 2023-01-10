import './App.css';
import Home from './components/home/home';
import { NewUser } from './components/newUser/newUser';
import {NewTrip} from './components/newTrip/newTrip'
import {Login} from './components/login/login';
import { Outlet, Route, Routes } from "react-router-dom";
import {ErrorForm} from './components/ErrorForm/ErrorForm';
import {FindTrip} from './components/findTrip/findTrip';
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
          <Route path="allTrips" element={<FindTrip  />}/>

      </Routes>
      <Outlet/>
    </div>
  );
}

export default App;
