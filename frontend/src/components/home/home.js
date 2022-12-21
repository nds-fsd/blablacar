
import { Link } from "react-router-dom";
import styles from "./home.module.css";

const Home = () => {

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
          <button id={styles.log_in} name="log_in" >
            Log in
          </button>
        </div>
      </div>
      <div className={styles.buscarViajeOut}>
        <div className={styles.buscarViajeIn}>
          <input type="text" id="origen" placeholder="Origen" />
          <input type="text" id="destino" placeholder="Destino" />
          <input type="date" id="date" />
          <input type="number" id="number" value="1" />
          <button id="buscar">Buscar</button>
        </div>
      </div>
      <div className={styles.ventajas}>
        <p className="p1">
          <span className={styles.importantP}>Miles de viajes baratos</span>
          <br />
          <br />
          Vayas donde vayas, encuentra tu viaje ideal a un precio muy bajo.
        </p>
        <p className={styles.p2}>
          <span className="importantP">Viaja seguro y tranquilo</span>
          <br />
          <br />
          Para nosotros es muy importante conocer a nuestros usuarios. Por eso,
          examinamos atentamente las opiniones y los perfiles de nuestros
          usuarios para que sepas con quién vas a viajar. Puedes reservar tu
          próximo viaje con total seguridad y tranquilidad.
        </p>
        <p className={styles.p3}>
          <span className="importantP">¡Busca, elige y a viajar!</span>
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
