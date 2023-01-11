import { useLocation } from "react-router-dom";
import styles from "./finTrip.module.css";
import {changeToShortDate} from "../../utils/shortdate.js"
import userLogo from "../assets/user.png"
const FindTrip = () => {
    const location = useLocation();
    const trips =location.state.trip
    console.log("findtrip",trips)
    return(
        <div className={styles.main}>
                <div className={styles.tittle}>
                    <div className={styles.tittleText}>
                        Viajes disponibles
                    </div>
                           
                </div>
                <div className={styles.body}>
                {trips.map(trip =>{return (
                    <div className={styles.trip}>
                        <div className={styles.location}>
                            <div className={styles.tripDraw}>
                                <div className={styles.circle}></div>
                                <div className={styles.line}></div>
                                <div className={styles.circle}></div>   
                            </div>
                            <div className={styles.tripLocation}>
                                <div className={styles.locationText}>
                                {trip.origin} 
                                </div>
                                <div className={styles.locationText}>
                                {trip.destination}   
                                </div>
                            </div>
                            
                        </div>
                        <div className={styles.details}>
                            <div className={styles.price}>
                                <span>{trip.price}€</span>
                            </div>
                            <div className={styles.seats}>
                            <span>{trip.seats} asientos</span>   
                            </div>
                            <div className={styles.user}>
                                <img src={userLogo} alt="usuario"/>
                            </div>
                        </div>
                    </div>
                )})}
                </div>
        </div>
        /*trips.map(trip =>{return (
            
        )})*/
    )
}

export {FindTrip}