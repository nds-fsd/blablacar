import "./App.css";
import Home from "./components/home/home";
import { NewUser } from "./components/newUser/newUser";
import { Login } from "./components/login/login";
import { Outlet, Route, Routes } from "react-router-dom";
import { ErrorForm } from "./components/ErrorForm/ErrorForm";
import { TripList } from "./components/ListTrips/ListTrips";
import { UsersList } from "./components/ListUsers/ListUsers";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users" element={<NewUser />} />
        <Route path="login" element={<Login />} />
        <Route path="*" element={<ErrorForm />} />
        <Route path="trip/list" element={<TripList />} />
        <Route path="users/list" element={<UsersList />} />
      </Routes>
      <Outlet />
    </div>
  );
}

export default App;
