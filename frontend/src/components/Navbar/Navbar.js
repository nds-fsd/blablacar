import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import IconLogo from '../../components/svgIcons/iconLogo'
import { Link } from "react-router-dom";
const Navbar = ( ) => {
const navigate=useNavigate()
  
   const handleClick = () =>{
    navigate("/")
    // tendras que ejecutar el ... useNavigate
    console.log('he clicado')

  }
    return(

        <div className="navBarWrapper">
          {/*  en este div hay que utilizar un onClick que utilize el useNavigate para ir al Home */}
        
        <div className="logo ml" onClick={() => handleClick()}>
        <IconLogo className="logoSvg"/>
        <p className="brand">PimPamBuga</p>
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

