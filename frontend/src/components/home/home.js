
import { Link,useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import React, {useState} from "react";
import { Request } from "../../utils/apiWrapper";


const Home = () => {
  const navigate = useNavigate();
  const [origin,setOrigin] = useState("");
  const [destination,setdestination] = useState("");
  const [originDate,setOriginDate] = useState("");
  const [seats,setSeats] = useState("");
  const [trip,setTrip] = useState([{}]);

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

  let trips = await Request (`trips/find/${origin}/${originDate}/${destination}/${seats}`);
  console.log("tripsHome",trips)
    if(trips?.error){
      if(trips.status !== 404){
        alert(trips.message)  
      }else{
        navigate("error");
      }    
    }else{
      setTrip(trips)
      console.log(trip)
      
      navigate("foundtrips")
    }
                   
  }
  return (
    <>
      <div className={styles.navigationBar}></div>
      <div className={styles.foto}>
        <p className={styles.titulo}>Viaja a donde quieras a buen precio</p>
        <div className={styles.buttons}>
        <Link to="/users">
          <button id={styles.register} name="register">
            Registrarse
          </button>
          </Link>
          <Link to="/login">
          <button id={styles.log_in} name="log_in" >
          Log in
          </button>
          </Link>
        </div>
      </div>
      <div className={styles.buscarViajeOut}>
        <div className={styles.buscarViajeIn}>
          <input type="text" id={styles.origen} placeholder="Origen" value = {origin} onChange ={handleOrigin} />
          <input type="text" id={styles.destino} placeholder="Destino" value = {destination} onChange ={handleDestination}/>
          <input type="date" id={styles.date} value = {originDate} onChange ={handleOriginDate} />
          <input type="number" id={styles.number}  value = {seats} onChange ={handleSeats} />
          <button id={styles.buscar} onClick={handleSubmit}>Buscar</button>
        </div>
      </div>
      <div className={styles.ventajas}>
        <p className={styles.p1}>
          <span className={styles.importantP}>Miles de viajes baratos</span>
          <br />
          <br />
          Vayas donde vayas, encuentra tu viaje ideal a un precio muy bajo.
        </p>
        <p className={styles.p2}>
          <span className={styles.importantP}>Viaja seguro y tranquilo</span>
          <br />
          <br />
          Para nosotros es muy importante conocer a nuestros usuarios. Por eso,
          examinamos atentamente las opiniones y los perfiles de nuestros
          usuarios para que sepas con quién vas a viajar. Puedes reservar tu
          próximo viaje con total seguridad y tranquilidad.
        </p>
        <p className={styles.p3}>
          <span className={styles.importantP}>¡Busca, elige y a viajar!</span>
          <br />
          <br />
          ¡Reservar un viaje es más fácil que nunca! Gracias a nuestra sencilla
          aplicación y a su potente tecnología, podrás reservar un viaje cerca
          de ti en minutos.
        </p>
      </div>
    </>
  );
};

export default Home;
