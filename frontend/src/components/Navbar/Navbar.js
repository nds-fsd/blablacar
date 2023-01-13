import "./Navbar.css";
import IconLogo from '../../components/svgIcons/iconLogo'
import { Link } from "react-router-dom";
const Navbar = ( ) => {

  
   const handleClick = () =>{
    // tendras que ejecutar el ... useNavigate
    console.log('he clicado')

  }
    return(

        <div className="navBarWrapper">
          {/*  en este div hay que utilizar un onClick que utilize el useNavigate para ir al Home */}
        
        <div className="logo ml" onClick={() => handleClick()}>
        <Link to="/"><IconLogo className="logoSvg"/></Link>
        <Link to="/"><p className="brand">PimPamBuga</p></Link>
        </div>
        
        <nav>
            <ul className="listNav" >
                {/* Dentro de cada li debe haber un componente Link de react router  */}
                <li>Buscador</li>
                <li>Publicar un viaje</li>
                <li>UserIcon</li>
            </ul>
        </nav>
      </div> 
    )
    
}

export default Navbar

