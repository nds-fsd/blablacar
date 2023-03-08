import { useState , useEffect, useRef } from "react";
import styles from "./TripExtended.module.css"
import {diaSemana, mesFecha, fechaHora} from "../../utils/dateWorks"
import {BsCircle , BsFillChatDotsFill} from "react-icons/bs"
import { IconContext } from "react-icons";
import UserAvatar from "../userAvatar/UserAvatar";
import { getStorageObject, getUserToken } from "../../utils/storage";
import { Button } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { Request } from "../../utils/apiWrapper";
import { ChatList } from "../chat/chatList";


const TripExtended = ()=>{
    
    const navigate=useNavigate()
    const [hasReservation, setHasReservation]=useState(false)
    const [login,setLogin]=useState(false)
    const myReservation=useRef("")
    const location=useLocation()
    const [showChat,setShowChat]=useState(false)
    console.log("location es", location);
    let trip=location.state.trip;
    const refSession=useRef(location.state.id)
    console.log("idRef",refSession);
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
            session&&session.userObj.userID===id
        )
    }
const checkReservation=async(id)=>{
    
    const tripReservations=trip.bookings
    console.log(tripReservations);
    console.log(id);
    for (let i=0;i<tripReservations.length;i++){
        if(tripReservations[i].passenger._id===id){
        console.log("es igual");
        setHasReservation(true)
        myReservation.current=tripReservations[i]._id
        console.log(hasReservation);
        }
    }
    console.log(hasReservation);
}
useEffect(()=>{
    const session=getStorageObject('user-session');
    console.log(session);
    if(session){
    refSession.current=session
    let id=session.userObj.userID
    setLogin(true)
    checkReservation(id)
    console.log(refSession.current);
    }
    
    
    
},[hasReservation, login])

const editTrip=()=>{
    //const navigate=useNavigate()
    
}

const bookTrip =async(id)=>{
   
    const user=refSession.current.userObj.userID
    let URLtoPost= "/booking?user="+encodeURIComponent(user)+"&trip="+encodeURIComponent(id)
    const booking= await Request(URLtoPost, "POST")
    console.log(booking);
    setHasReservation(true)
    myReservation.current=booking.id
   //aqui ponemos el codigo para hacer el post a la BAse de datos indicando que 
   //el viaje está reservado
   console.log(id);
}

const cancelBooking =async()=>{
   
    let URLtoPost= `/booking/${myReservation.current}`
    const delBooking= await Request(URLtoPost, "DELETE")
    console.log(delBooking.message)
    setHasReservation(false)
    myReservation.current=""
}


const openChat=async(user)=>{
    const session=getUserToken()
    const headers= {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.jwtToken}`
    }
    const body={
        member:user
    }
    const chat=await Request("/chat","POST", body, headers)
    console.log(chat);
    chat&&setShowChat(true)

}

return(
   <div className={styles.modalBackground}>
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
        <h2>{trip.owner[0].firstName}  {trip.owner[0].surname}</h2>
        <div className={styles.userIcons}>
        {refSession.current&&!ownerCheck(trip.owner[0]._id)&&    
        <IconContext.Provider value={{ size:"2em" }}>
        <BsFillChatDotsFill className={styles.openChat} onClick={(e)=>openChat(trip.owner[0])}/>
        </IconContext.Provider>
        }
        <UserAvatar user={trip.owner[0].firstName}  picUrl={trip.owner[0].picUrl} showName={false}/>
        </div>
        </div>
        {!refSession.current&&<p className={styles.warning}>Por favor, inicia sesión para reservar o chatear con el creador del viaje</p>}
            {login&&ownerCheck(trip.owner[0]._id)?
            <Button onClick={(e)=>{editTrip(trip._id)}} bsPrefix="goTrip" >Editar</Button>
            :
            ""
            }
            {(login&&!ownerCheck(trip.owner[0]._id)&&trip.availableSeats>0&&!hasReservation)?
            <Button onClick={(e)=>{bookTrip(trip._id)}} bsPrefix="goTrip" >Reservar</Button>
            :
            ""
            }           
            {(login&&hasReservation)?
            <Button onClick={(e)=>{cancelBooking(trip._id)}} bsPrefix="goTrip" >Cancelar Reserva</Button>
            :
            ""
            }
            
            
            
            {showChat&&<ChatList/>}

    </div>
    </div> 
)
}




export default TripExtended