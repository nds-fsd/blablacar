import './App.css';
import Home from './components/home/home';
import { NewUser } from './components/newUser/newUser';
import {Login} from './components/login/login';
import { Outlet, Route, Routes } from "react-router-dom";
import {ErrorForm} from './components/ErrorForm/ErrorForm'
function App() {
  return (
    <div>
          <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="users" element={<NewUser />}/>
          <Route path="*" element={<ErrorForm />}/>
          <Route path="login" element={<Login />}/>
      </Routes>
      <Outlet/>
    </div>
  );
}

export default App;
