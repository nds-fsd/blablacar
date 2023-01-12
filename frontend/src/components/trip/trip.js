import userLogo from "../assets/user.png"
import {changeToShortDate} from "../../utils/apiWrapper"
import styles from "./trip.module.css";
import {Modal} from "../modal/modal";
import {useState} from "react";

const Trip = (props) =>{
    const [id,setId] = useState("");
    const tripsFind = props.tripsFind
    const getId = (id) =>{
        setId(id)
        return id
    }
    return(
        <div className={styles.main}>
        <div className={styles.tittle}>
            <div className={styles.tittleText}>
                Viajes disponibles
            </div>     
        </div>
        <div className={styles.body}>
        {tripsFind.map(trip =>{return (
            <div className={styles.trip} onClick ={() => props.updateTrip(trip._id)} >
                <div className={styles.dateDate}>
                    <div className={styles.dateText}>
                        <span>{changeToShortDate(trip.originDate)}</span>
                    </div>
                    <div className={styles.cross}>
                        <button className={styles.crossText} onClick ={() =>props.deleteTrip(trip._id)}>X</button>
                    </div>
                </div>
                <div className={styles.bodyData} onClick ={() => getId(trip._id)} >
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
                 
            </div>
        )})}
        </div>
        <div><Modal open={props.openModal} id = {id}/></div>
        
</div>
)}
export {Trip}