import styles from "./findTrip.module.css";
import TripSummary from "../TripSummary/TripSummary";
import { useEffect, useRef, useState} from "react";
import { Request } from "../../utils/apiWrapper";

const FindTrip = (props) => {
    const [trips,setTrips]=useState()
  useEffect(() => {
    // Obtener los query params de la URL
    const searchParams = new URLSearchParams(window.location.search);
    const queryParams = Object.fromEntries(searchParams.entries());
    const getTrips=async()=>{
    // Realizar la petición HTTP con los query params en el cuerpo
    let getTrips = await Request("/trips","POST", queryParams)
    setTrips(getTrips)
    }
    !trips&&getTrips()
    
  }, []);
      
      
           

    

    
    
    return(
        <div className={styles.parappa}>
            {trips&&trips.map(e=>

            <div className={styles.wrapTrip}><TripSummary trip={e} id={e._id} setWhatModal={props.setWhatModal} setOpenModal={props.setOpenModal}></TripSummary></div>)
            }

        </div>
    )
}

export {FindTrip}