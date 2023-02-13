import React from "react";
import { Card, Button } from "react-bootstrap";
import UserAvatar from "../userAvatar/UserAvatar";
import styles from "./TripSummary.module.css"
import {BsCircle, BsArrowDown } from "react-icons/bs"
import ConfigIcon from "../IconConfig/iconsize_small"
function TripSummary(props) {
  let trip=props.trip
  let owner;

  // tienes que hacer una comprobacion sobre el owner y si no hay owner meter uno en plan dummy 
  if(props.trip.owner){
     owner = props.trip.owner[0]
  }else{
     owner = {
      firstName : '',
      picUrl : ''
    }
  }
  // let owner=props.trip.owner[0] || null
  console.log(trip);
  console.log(owner);
    return (
      
        <Card bsPrefix="tripSummary">
              <div className={styles.cardTop}>
                <div className={styles.leftwrapper}>  
                  <div className={styles.timeTable}>
                    <p>00:00</p>
                    <p>12:00</p>
                  </div>  
                  <div className={styles.locations}>
                    <div className={styles.location_graph_top}>
                      <BsCircle></BsCircle>{trip&&<p>{trip.origin}</p>}
                    </div>
                    <div className={styles.location_graph_mid}>
                      <ConfigIcon> <BsArrowDown></BsArrowDown></ConfigIcon>
                    </div>
                    <div className={styles.location_graph_bottom}>
                      <BsCircle></BsCircle>
                      {trip&&<p>{trip.destination}</p>}  
                    </div>
                  </div>
                </div>  
                <div className={styles.pricing}>
                  {trip&&<h1>{trip.price}€</h1>}
                </div>
              </div>
            <div className={styles.cardBottom}>
              {owner&&<UserAvatar user={owner.firstName} picUrl={owner.picUrl} showName="true"/>}          
              <div className={styles.userIcons}>
                {console.log('quedan '+trip.availableSeats)}
                {trip.availableSeats&&<p>¡Quedan  <b>{trip.availableSeats}</b> plazas!</p>}
              </div>
            </div>            
        </Card>
    )      
  }
  
  export default TripSummary;