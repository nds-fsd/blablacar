
import styles from "./TripExtended.module.css"
import {diaSemana, mesFecha, fechaHora} from "../../utils/dateWorks"
import {BsCircle } from "react-icons/bs"
import UserAvatar from "../userAvatar/UserAvatar";
import { getStorageObject } from "../../utils/storage";
import { Button } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { Request } from "../../utils/apiWrapper";
const session=getStorageObject('user-session');
const TripExtended = ()=>{
    const location=useLocation()
    let trip=location.state;
    console.log(trip);
    let originDate=new Date(trip.originDate);
    let departureTime=new Date(trip.departureTime);
    let arrivalTime=new Date(trip.arrivalTime);
    let diaSalida=diaSemana(originDate);
    let mesSalida=mesFecha(originDate)
    
    const googleMapOrigin=()=>{
    window.open(`https://www.google.es/maps/search/${trip.origin}`, '_blank', 'noreferrer');
    }    
const googleMapDestination=()=>{
        window.open(`https://www.google.es/maps/search/${trip.destination}`, '_blank', 'noreferrer');
    }

    const ownerCheck=(id)=>{
        let session=getStorageObject('user-session')
        return(
            session.userObj.userID===id
        )
    }

const editTrip=()=>{
    console.log("Editar Tripy")
}

const bookTrip =(id)=>{
    const user=session.userObj.userID
    let URLtoPost= "/booking?user="+encodeURIComponent(user)+"&trip="+encodeURIComponent(id)
    Request(URLtoPost, "POST")
   //aqui ponemos el codigo para hacer el post a la BAse de datos indicando que 
   //el viaje está reservado
   console.log(id);
}

return(

    <div className={styles.parappa}>
        <h1>{diaSalida},{originDate.getDate()} de {mesSalida}</h1>   
            <div className={styles.cardTop}>
                <div className={styles.locations}>
                    <div className={styles.location_graph_top}>
                    <p>{fechaHora(departureTime)}</p><BsCircle></BsCircle>{trip&&<p>{trip.origin}</p>}
                    </div>
                    <div className={styles.location_graph_mid}>
                    
                    </div>
                    <div className={styles.location_graph_bottom}>
                    <p>{fechaHora(arrivalTime)}</p><BsCircle></BsCircle>{trip&&<p>{trip.destination}</p>}  
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
            
            {ownerCheck(trip.owner[0]._id)?<Button onClick={(e)=>{editTrip(trip._id)}} bsPrefix="goTrip" >Editar</Button>:<Button onClick={(e)=>{bookTrip(trip._id)}} bsPrefix="goTrip" >Reservar</Button>}

    </div>
)
}




export default TripExtended