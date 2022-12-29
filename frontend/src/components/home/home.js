
import { Link } from "react-router-dom";
import styles from "./home.module.css";
import React, {useState} from "react";
import { request } from "../../utils/apiWrapper";

const Home = () => {

  const [origin,setOrigin] = useState("");
  const [destination,setdestination] = useState("");
  const [originDate,setOriginDate] = useState("");
  const [seats,setSeats] = useState("");
  const [trip,setTrip] = useState([]);

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

  let trips = await request(`trips/find/${origin}/${originDate}/${destination}/${seats}`);
  
    if(trips?.error){
      alert(trips.message)
    }else{
      setTrip(trips)
      console.log(trips)
    }
                   
  }
  return (
    <>
      <div className={styles.navigationBar}></div>
      <div className={styles.foto}>
        <p className={styles.titulo}>Viaja a donde quieras a buen precio</p>
        <div className={styles.buttons}>
          <button id={styles.register} name="register">
            <Link to="/users">Registrarse</Link>
          </button>
          <button id={styles.log_in} name="log_in" >
          <Link to="/login">Log in</Link>
          </button>
        </div>
      </div>
      <div className={styles.buscarViajeOut}>
        <div className={styles.buscarViajeIn}>
          <input type="text" id="origen" placeholder="Origen" value = {origin} onChange ={handleOrigin}/>
          <input type="text" id="destino" placeholder="Destino" value = {destination} onChange ={handleDestination}/>
          <input type="date" id="date" value = {originDate} onChange ={handleOriginDate} />
          <input type="number" id="number" value = {seats} onChange ={handleSeats} />
          <button id="buscar" onClick={handleSubmit}>Buscar</button>
        </div>
      </div>
    </>
  );
};

export default Home;
