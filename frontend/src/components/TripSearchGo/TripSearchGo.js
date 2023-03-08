import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { Request } from "../../utils/apiWrapper";
import styles from "./TripSearchGo.module.css"

const TripSearchGo=(props)=>{
    let navigate=useNavigate()

    const handleClick = async () =>{
        let body={}
        body.origin=props.origin
        body.destination=props.destination
      let trips = await Request (`/trips/find/`,"POST",body);
      let foundTrips
      console.log("tripsHome",trips)
        if(trips?.error){
          if(trips.status !== 404 || trips.status !== 500){
            alert(trips.message)  
          }else{
            navigate("error");
          }    
        }else{
             foundTrips = trips
             navigate("/trips/searchresults", {state:foundTrips})
          }
         
        }

    return(
    <>
        <Button onClick={handleClick}  bsPrefix="goTripReverse">{props.origin}----{props.destination}</Button>{''}
    
    </>    

    )
}
export default TripSearchGo