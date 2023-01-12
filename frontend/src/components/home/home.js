
import { Link,useNavigate } from "react-router-dom";
import styles from "./home.module.css";
import React from "react";
import TripSearchBar from "../TripSearchBar/tripSearchBar";
const Home = () => {
  const navigate = useNavigate();
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
      <TripSearchBar/>
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
      <div className={styles.userButton}>
          <button onClick ={handleSubmitUser}>Users</button>
      </div>
    </>
  );
};

export default Home;
