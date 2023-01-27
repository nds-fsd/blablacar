import { Outlet, useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import { getStorageObject } from "../../utils/storage";

export const ProtectedRoute = () => {
    const navigate=useNavigate()
    const {token, saveToken}=useContext(AuthContext)
    useEffect(()=>{
      console.log(token);
      if (!token){
        
    const sessiontoken = getStorageObject("user-session")
    if (!sessiontoken){
        navigate("/login")
        return
      }
      saveToken(sessiontoken.jwtToken)
      
      console.log(token);
    }
    })
    return <Outlet/>
}
      
    
  
  export default ProtectedRoute;