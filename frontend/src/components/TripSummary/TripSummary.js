import React, { useEffect ,  useRef } from "react";
import { Card } from "react-bootstrap";
import UserAvatar from "../userAvatar/UserAvatar";
import styles from "./TripSummary.module.css"
import {BsCircle, BsArrowDown } from "react-icons/bs"
import ConfigIcon from "../IconConfig/iconsize_small"
import { useNavigate } from "react-router-dom";
import { getStorageObject } from "../../utils/storage";
import { diaSemana , mesFecha , fechaHora } from "../../utils/dateWorks";
function TripSummary(props) {
  console.log(props);
  const navigate=useNavigate()
  let trip=props.trip
  let departure=new Date(props.trip.departureTime)
  let arrival = new Date(props.trip.arrivalTime)
  let departureDate=new Date(props.trip.originDate)

  let owner=props.trip.owner[0]
  console.log(owner);
  let showSeats;
  let showAvatar;
  let id=useRef()
  useEffect(()=>{
    
    const session=getStorageObject('user-session')
    if(session){id.current=session.userObj.userID}
  })

  // tienes que hacer una comprobacion sobre el owner y si no hay owner meter uno en plan dummy 
  
  // let owner=props.trip.owner[0] || null
    return (
      
        <Card bsPrefix="tripSummary" className={props.location==="profile"?"noMargin":""} onClick={()=>{props.setOpenModal(true); props.setWhatModal("TripExtended");navigate(`/trips/${props.id}`,{state: { trip: trip, id: id.current},})}}>
              {showSeats=props.showSeats??true}
              {showAvatar=props.showAvatar??true}
              <div className={styles.date}><p>{diaSemana(departureDate)}, {departureDate.getDate()} de {mesFecha(departureDate)}</p></div>
              <div className={styles.cardTop}>
                <div className={styles.leftwrapper}>  
                  <div className={styles.timeTable}>
                    <p>{fechaHora(departure)}</p>
                    <p>{fechaHora(arrival)}</p>
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