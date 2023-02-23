import React, { useEffect, useRef, useState } from "react";
import styles from "./TripExtended.module.css"
import {diaSemana, mesFecha, fechaHora} from "../../utils/dateWorks"
import {BsCircle, BsArrowDown } from "react-icons/bs"
import ConfigIcon from "../IconConfig/iconsize_small"
import UserAvatar from "../userAvatar/UserAvatar";
import { getStorageObject } from "../../utils/storage";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const TripExtended = ()=>{
    const location=useLocation()
    let trip=location.state;
    console.log(trip);
    let originDate=new Date(trip.originDate);
    let destinationDate=new Date(trip.destinationDate);
    let diaSalida=diaSemana(originDate);
    let mesSalida=mesFecha(originDate)
    console.log(diaSalida);
    console.log(originDate);
    console.log(destinationDate);
    const googleMapOrigin=()=>{
        window.open(`https://www.google.es/maps/search/${trip.origin}`, '_blank', 'noreferrer');
    }    
    const googleMapDestination=()=>{
        window.open(`https://www.google.es/maps/search/${trip.destination}`, '_blank', 'noreferrer');
    }

    const ownerCheck=(id)=>{
        console.log(id);
        let session=getStorageObject('user-session')
        console.log("compar con");
        console.log(session);
        return(
            session.userObj.userID===id
        )
    }
    console.log(ownerCheck(trip.owner[0]._id))

return(

    <div className={styles.parappa}>
        <h1>{diaSalida},{originDate.getDate()} de {mesSalida}</h1>   
            <div className={styles.cardTop}>
                <div className={styles.locations}>
                    <div className={styles.location_graph_top}>
                    <p>{fechaHora(originDate)}</p><BsCircle></BsCircle>{trip&&<p>{trip.origin}</p>}
                    </div>
                    <div className={styles.location_graph_mid}>
                    
                    </div>
                    <div className={styles.location_graph_bottom}>
                    <p>{fechaHora(destinationDate)}</p><BsCircle></BsCircle>{trip&&<p>{trip.destination}</p>}  
                    </div>
                    <div className={styles.onClickTop} onClick={googleMapOrigin}></div>
                    <div className={styles.onClickBottom} onClick={googleMapDestination}></div>
                </div>  
            </div>
            <div className={styles.barra}/>
            <div className={styles.pricing}>
                <h2>El precio por pasajero es de {trip.price} €</h2>
            </div>
            <div className={styles.barra}/>
            <div className={styles.userSection}>
             {trip.owner[0]&&<h2>{trip.owner[0].firstName}  {trip.owner[0].surname}</h2>}
             {trip.owner[0]&&<UserAvatar user={trip.owner[0].firstName} picUrl={trip.owner[0].picUrl} showName={false}/>}
            </div>
            

            {ownerCheck(trip.owner[0]._id)?<Button bsPrefix="goTrip" >Editar</Button>:<Button bsPrefix="goTrip" >Reservar</Button>}

    </div>
)
}




export default TripExtended