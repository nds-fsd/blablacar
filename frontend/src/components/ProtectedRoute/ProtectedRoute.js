import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getStorageObject } from "../../utils/storage";
import { NewTrip } from "../newTrip/newTrip";
import ChoseModal from "../../modal/choseModal";

export const ProtectedRoute = (props) => {
    const [token,setToken]=useState()
    const navigate=useNavigate()
    
    useEffect(()=>{
      
      if (!token){
        
    const sessiontoken = getStorageObject("user-session")
    if (!sessiontoken){
        navigate("/")
        return
      }
      setToken(sessiontoken.jwtToken)
    }
    })
    const jsxElement={
      whatModal:props.whatModal??"",
      setWhatModal:props.setWhatModal??"",
      openModal:props.openModal??""
    }
    
    return (

      <Outlet whatModal={jsxElement.whatModal} setWhatModal={jsxElement.setWhatModal} openModal={jsxElement.openModal}/>
      
    )
    
}
      
    
  
  export default ProtectedRoute;