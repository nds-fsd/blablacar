import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { getStorageObject } from "../../utils/storage";

export const ProtectedRoute = () => {
    const [token,setToken]=useState()
    const navigate=useNavigate()
    
    useEffect(()=>{
      
      if (!token){
        
    const sessiontoken = getStorageObject("user-session")
    if (!sessiontoken){
        navigate("/login")
        return
      }
      setToken(sessiontoken.jwtToken)
    }
    })
    return <Outlet/>
}
      
    
  
  export default ProtectedRoute;