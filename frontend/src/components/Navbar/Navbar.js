import "./Navbar.css";
import IconLogo from '../../components/svgIcons/iconLogo'
import userLogo from "../assets/user.png"
import { Link, useNavigate } from "react-router-dom";
const Navbar = ( ) => {
const navigate = useNavigate();

    return(
<div className="navBarWrapper">
        <div className="logo ml">
        <Link to="/"><IconLogo className="logoSvg"/></Link>
        <Link to="/"><p className="brand">PimPamBuga</p></Link>
        </div>
     
        <nav>
            <ul className="listNav" >
                {/* Dentro de cada li debe haber un componente Link de react router  */}
                <div className="navbardiv" onClick={() => navigate("/search")}>Buscador</div>
                <Link to ="/trips">
                <div className="navbardiv">Publicar un viaje</div> 
                </Link>
                <li>
                <div className="dropdown">
                  <img src={userLogo} alt="usuario" className= "userLogo"/>
                  <div className="dropdown-content">
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

