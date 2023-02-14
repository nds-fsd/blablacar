import { useNavigate } from "react-router-dom";
import styles from "./tripSearchBar.module.css";
import React, {useState} from "react";
import { Request } from "../../utils/apiWrapper";
import ConfigIcon from "../IconConfig/iconsize";
import { RiUser3Fill} from "react-icons/ri"
const TripSearchBar = () => {
  const navigate = useNavigate();
  const [origin,setOrigin] = useState("");
  const [destination,setdestination] = useState("");
  const [originDate,setOriginDate] = useState("");
  const [seats,setSeats] = useState("");
  //const [trip,setTrip] = useState([{}]);

  const handleOrigin = (event)=>{
    setOrigin(event.target.value)
  }
  const handleDestination = (event)=>{
    setdestination(event.target.value)
  }
  const handleOriginDate = (event)=>{
    setOriginDate(event.target.value)
  }
  const handleSeats = (event)=>{
    setSeats(event.target.value)
  }

  const handleSubmit = async () =>{
    let body={}
    body.origin=origin
    body.originDate=originDate
    body.destination=destination
    body.seats=seats


  let trips = await Request (`/trips/`,"POST",body);
  let foundTrips
    if(trips?.error){
      if(trips.status !== 404 || trips.status !== 500){
        alert(trips.message)  
      }else{
        navigate("error");
      }    
    }else{
         foundTrips = trips
         navigate("/trips/searchresults", {state:foundTrips})
      }
     
    }


return(
<div className={styles.buscarViajeOut}>
    <div className={styles.buscarViajeIn}>

     <input type="text" id={styles.origen} placeholder="Origen" value = {origin} onChange ={handleOrigin} />
     <input type="text" id={styles.destino} placeholder="Destino" value = {destination} onChange ={handleDestination}/>
     <input type="date" id={styles.date} value = {originDate} onChange ={handleOriginDate} />
     <input type="number" min={1} max={10} id={styles.number}  value = {seats} onChange ={handleSeats} /><ConfigIcon><RiUser3Fill /></ConfigIcon>
     <button id={styles.buscar} onClick={handleSubmit}>Buscar</button>

    </div>
</div>)
}         
export default TripSearchBar;          
  