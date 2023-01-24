import styles from "./navbar.module.css";
import userLogo from "../assets/user.png"
import { useNavigate } from "react-router-dom";
import IconLogo from '../../components/svgIcons/iconLogo'
import {getUserToken, removeUserToken} from "../../utils/storage"

const Navbar = ( ) => {
const navigate=useNavigate()
  
   const logOut = () =>{
    removeUserToken()
    navigate("/login")
  }
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
                    {!getUserToken() && (   <div className={styles.dropdown}>
                      <img src={userLogo} alt="usuario" className= {styles.userLogo}/>
                      <div className={styles.dropdownContent}>
                      <p onClick={() => navigate("/login")}>Login</p>
                      <p onClick={() => navigate("/users")}>Registrarse</p>
                      </div>
                    </div>)}
                    {getUserToken() && (   <div className={styles.dropdown}>
                      <div className={styles.imgRedonda}>Hola</div>
                      <div className={styles.dropdownContent}>
                      <p onClick={logOut}>Logout</p>
                      </div>
                    </div>)}

                </div>
            </nav>
          </div>
            
        )
        
    }
    
    export default Navbar 

