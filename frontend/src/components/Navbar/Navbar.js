import "./Navbar.css";
import IconLogo from '../../components/svgIcons/iconLogo'
import userLogo from "../assets/user.png"
import { Link } from "react-router-dom";
const Navbar = ( ) => {

    return(
<div className="navBarWrapper">
        <div className="logo ml">
        <Link to="/"><IconLogo className="logoSvg"/></Link>
        <Link to="/"><p className="brand">PimPamBuga</p></Link>
        </div>
     
        <nav>
            <ul className="listNav" >
                {/* Dentro de cada li debe haber un componente Link de react router  */}
                <Link to="trips/searchresults">
                <li>Buscador</li>
                </Link>
                <Link to ="/trips">
                <li>Publicar un viaje</li> 
                </Link>
                <li>
                <div className="dropdown">
                  <img src={userLogo} alt="usuario" className= "userLogo"/>
                  <div class="dropdown-content">
                  <Link to="/login"><p>Login</p></Link>
                  <Link to="/users"><p>Registrarse</p></Link>
                  </div>
                </div>
                </li>
            </ul>
        </nav>
      </div>
        
    )
    
}

export default Navbar

