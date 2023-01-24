import styles from "./navbar.module.css";
import IconLogo from '../../components/svgIcons/iconLogo'
import userLogo from "../assets/user.png"
import { Link, useNavigate } from "react-router-dom";
const Navbar = ( ) => {
const navigate = useNavigate();

    return(
<div className={styles.navBarWrapper}>
        <div className={`${styles.logo} ${styles.ml}`}>
        <IconLogo className={styles.logoSvg} onClick={() => navigate("/")}/>
        <p className={styles.brand} onClick={() => navigate("/")}>PimPamBuga</p>
        </div>
     
        <nav>
            <div className={styles.listNav} >
                {/* Dentro de cada li debe haber un componente Link de react router  */}
                <div className={styles.navbardiv} onClick={() => navigate("/search")}>Buscar</div>
                <div className={styles.navbardiv} onClick={() => navigate("/trips")}>Publicar un viaje</div> 
                <div className={styles.dropdown}>
                  <img src={userLogo} alt="usuario" className= {styles.userLogo}/>
                  <div className={styles.dropdownContent}>
                  <p onClick={() => navigate("/login")}>Login</p>
                  <p onClick={() => navigate("/users")}>Registrarse</p>
                  </div>
                </div>
            </div>
        </nav>
      </div>
        
    )
    
}

export default Navbar

