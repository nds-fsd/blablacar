import React, { useEffect ,  useRef } from "react";
import { Card } from "react-bootstrap";
import UserAvatar from "../userAvatar/UserAvatar";
import styles from "./TripSummary.module.css"
import {BsCircle, BsArrowDown } from "react-icons/bs"
import ConfigIcon from "../IconConfig/iconsize_small"
import { useNavigate } from "react-router-dom";
import { getStorageObject } from "../../utils/storage";
function TripSummary(props) {
  const navigate=useNavigate()
  let trip=props.trip
  let owner;
  let showSeats;
  let showAvatar;
  let id=useRef()
  console.log("id es",id.current);
  useEffect(()=>{
    
    const session=getStorageObject('user-session')
    if(session){id.current=session.userObj.userID}
    console.log("ahora ID es", id.current);
  })

  console.log(trip);
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
    return (
      
        <Card bsPrefix="tripSummary" onClick={()=>{props.setOpenModal(true); props.setWhatModal("TripExtended");navigate(`/trips/${props.id}`,{state: { trip: trip, id: id.current},})}}>
              {showSeats=props.showSeats??true}
              {showAvatar=props.showAvatar??true}
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
              {showAvatar&&<UserAvatar user={owner.firstName} picUrl={owner.picUrl} showName="true"/>}
              <div className={styles.userIcons}>
                {showSeats && (trip.availableSeats>0)&&<p>¡Quedan  {trip.availableSeats} plazas!</p>}
                {showSeats && (trip.availableSeats===0)&&<p>¡Viaje completo! Lo sentimos...</p>}
              </div>
            </div>            
        </Card>
    )      
  }
  
  export default TripSummary;