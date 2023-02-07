import React from "react";
import { Card, Button } from "react-bootstrap";
import UserAvatar from "../userAvatar/UserAvatar";
import styles from "./TripSummary.module.css"
import {BsCircle, BsArrowDown } from "react-icons/bs"

function TripSummary(props) {
  let trip=props.trip
  let owner=props.trip.owner[0]
  console.log(trip);
  console.log(owner);
    return (
      
        <Card border="primary">
              <div className={styles.cardTop}>
                    
                    <div className={styles.timeTable}>
                      <p>00:00</p>
                      <p>12:00</p>
                    </div>  
                <div className={styles.locations}>
                  <div className={styles.location_graph}>
                   <BsCircle></BsCircle>
                    <BsArrowDown></BsArrowDown>
                    <BsCircle></BsCircle>
                  </div>
                  <div className={styles.location_text}>
                    {trip&&<p>{trip.origin} <br/> {trip.destination}</p>}  
                  </div>
                </div>
                <div className={styles.pricing}>
                  {trip&&<h1>{trip.price}</h1>}
                </div>
              </div>
            <div className={styles.cardbottom}>
              {owner&&<UserAvatar user={owner.firstName} picUrl={owner.picUrl}/>}          
              {owner&&<h1>{owner.firstName}</h1>}
              <div className={styles.usericons}>
                {console.log('quedan '+trip.availableSeats)}
                {trip.availableSeats&&<h2>¡Quedan  <b>{trip.availableSeats}</b> plazas!</h2>}
              </div>
            </div>            
        </Card>
    )      
  }
  
  export default TripSummary;