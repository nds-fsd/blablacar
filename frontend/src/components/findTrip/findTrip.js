import styles from "./findTrip.module.css";
import TripSummary from "../TripSummary/TripSummary";
import { useEffect, useRef, useState} from "react";
import { Request } from "../../utils/apiWrapper";
import { Link } from "react-router-dom";

const FindTrip = (props) => {
    const [trips,setTrips]=useState()
    const [notFound,setNotFound]=useState(false)
  useEffect(() => {
    // Obtener los query params de la URL
    const searchParams = new URLSearchParams(window.location.search);
    const queryParams = Object.fromEntries(searchParams.entries());
    const getTrips=async()=>{
    // Realizar la petición HTTP con los query params en el cuerpo
    let getTrips = await Request("/trips","POST", queryParams)
    getTrips.error===true?
    setNotFound(true)
    :
    setTrips(getTrips)
    }
    !trips&&getTrips()
    
  }, []);
      
      
           

    

    
    
    return(
        <div className={styles.parappa}>
            {notFound? 
            <>
            <h1 className={styles.notFound1}>Lo siento, no hay resultados para tu búsqueda</h1> 
            <Link to="/">
            <h3 className={styles.notFound2}>Volver</h3>
            </Link>
            </>
            :
            trips&&trips.map(e=>

            <div className={styles.wrapTrip}><TripSummary trip={e} id={e._id} setWhatModal={props.setWhatModal} setOpenModal={props.setOpenModal}></TripSummary></div>)
            }

        </div>
    )
}

export {FindTrip}