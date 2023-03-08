import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Request } from "../../utils/apiWrapper";
import styles from "./TripSearchGo.module.css"

const TripSearchGo=(props)=>{
    let navigate=useNavigate()

    const handleClick = () =>{
      navigate(`/trips/searchresults/?origin=${decodeURIComponent(props.origin)}&destination=${decodeURIComponent(props.destination)}`)
        }

    return(
    <>
        <Button onClick={handleClick}  bsPrefix="goTripReverse">{props.origin}----{props.destination}</Button>{''}
    
    </>    

    )
}
export default TripSearchGo