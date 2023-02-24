import styles from "./findTrip.module.css";
import {  useSearchParams } from "react-router-dom";
import TripSummary from "../TripSummary/TripSummary";
import { useEffect, useRef, useState} from "react";
import { Request } from "../../utils/apiWrapper";
import { useNavigate } from "react-router-dom";

const FindTrip = (props) => {
  console.log(props);
    
    const navigate=useNavigate()

    const [trips,setTrips]=useState()
  useEffect(() => {
    // Obtener los query params de la URL
    const searchParams = new URLSearchParams(window.location.search);
    const queryParams = Object.fromEntries(searchParams.entries());
    const getTrips=async()=>{
    // Realizar la petición HTTP con los query params en el cuerpo
    let getTrips = await Request("/trips","POST", queryParams)
    console.log(queryParams);
    console.log(trips);
    setTrips(getTrips)
    }
    !trips&&getTrips()
    
  }, []);
      
      
           

    

    
    
    return(
        <div className={styles.parappa}>
          {console.log(trips)}
            {trips&&trips.map(e=>

            <div className={styles.wrapTrip}><TripSummary trip={e} id={e._id} setWhatModal={props.setWhatModal} setOpenModal={props.setOpenModal}></TripSummary></div>)
            }

        </div>
    )
}

export {FindTrip}