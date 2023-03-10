
import styles from './parallax.module.css'
import { useState , useEffect } from 'react';
import TripSearchBar from "../TripSearchBar/tripSearchBar";
import TripSearchGo from "../TripSearchGo/TripSearchGo";
import {ChatList} from '../chat/chatList'
import { getUserToken } from "../../utils/storage";


const Parallax = ({setOpenModal, setWhatModal, openModal, whatModal})=>{

  const [logged,setLogged]=useState(false)
  useEffect(()=>{
    
    const session=getUserToken();
    if (session&&session.jwtToken){
      setLogged(true)
    }
  },[])
  
  return (
  <div className={styles.wrapper}>		
        <div className={styles.ParallaxContent}>
          <div className={styles.container}>
            {/* <div className={styles.ParallaxVideo}>
              <video autoPlay muted loop>
                <source src="https://cdn.coverr.co/videos/coverr-hands-on-steering-wheel-6651/1080p.mp4" type="video/mp4"/>
            	</video>        	
            </div> */}
          </div>           
        </div>  
      <div className={`${styles.ParallaxImage} ${styles.bg2} ${styles.addBottomMargin}`}>  
      <h1>Los mejores destinos, al mejor precio.</h1>
       
          <TripSearchBar openModal={openModal} whatModal={whatModal} setOpenModal={setOpenModal}/>
       
      </div>
            <div className={`${styles.ParallaxImage_2} ${styles.bg3}`}>
        <div className={styles.container}>
            <div className={styles.ventajas}>
              <p className={styles.p1}>
                <span className={styles.importantP}>Marta, 23 años, Sevilla.</span>
                <br/>
                "Poder ver el perfil del resto de viajeros me da mucha tranquilidad. El táser que llevo en el bolso, aún más."
              </p>
              <p className={styles.p2}>
                <span className={styles.importantP}>Julián, 31 años, Barcelona</span>
                <br/>
                "No sólo me permite ahorrar en mis viajes, con PimPamBuga he conocido a 
                algunos de mis mejores amigos. Aunque siempre dicen que me llamaran y luego nunca lo hacen..."
              </p>
              <p className={styles.p3}>
                <span className={styles.importantP}>Roberto, 45 años, Badajoz.</span>
                <br/>
                "Es genial compartir viaje con otras personas y descubrir sus gustos y aficiones. Menos al que me hizo el Spoiler del final de Sexto Sentido, a ese no quiero volver a verlo."
              </p>
              

            </div>
        </div>
      </div> 
      <div className={styles.ParallaxImage_2}>
        <div className={styles.container}>        
          <div className={styles.ventajas}>
            <p className={styles.p1}>
              <span className={styles.importantP}>Miles de viajes baratos</span>
              <br/>
              Vayas donde vayas, encuentra tu viaje ideal a un precio muy bajo.</p>
          
            <p className={styles.p2}>
            <span className={styles.importantP}>Viaja seguro y tranquilo</span>
              <br/>
               Para nosotros es muy importante conocer a nuestros usuarios. Por eso,
               examinamos atentamente las opiniones y los perfiles de nuestros
               usuarios para que sepas con quién vas a viajar. Puedes reservar tu
               próximo viaje con total seguridad y tranquilidad.
          </p>
          <p className={styles.p3}>
              <span className={styles.importantP}>¡Busca, elige y a vir!</span>
              <br/>
              ¡Reservar un viaje es más fácil que nunca! Gracias a nuestra sencilla
              aplicación y a su potente tecnología, podrás reservar un viaje cerca
              de ti en minutos.
          </p>

          </div>                           
        </div>              
      </div>


      <div className={`${styles.ParallaxImage_2} ${styles.bg1}`}>
        <div className={styles.container}>
          <h3>POR UN FUTURO VERDE</h3>
            <div className={styles.ventajas}>
              <p className={styles.p1}>
                <span className={styles.importantP}>No sólo ahorras dinero.</span>
                <br/>
                Cada vez que compartes coche, estás ayudando a reducir las emisiones de CO2.  
              </p>
              <p className={styles.p2}>
                <span className={styles.importantP}>El futuro es eléctrico</span>
                <br/>
                Descuentos y oportunidades exclusivas si compartes viaje en tu super TESLA chachi de la muerte.
              </p>
              <p className={styles.p3}>
                <span className={styles.importantP}>Día a día, creando un futuro mejor.</span>
                <br/>
                Desde nuestros inicios, hemos ahorrado ya más de 10.000 litros de combustible. Eso supone dejar de emitir lo mismo que 1 millón de pedos de vaca.*
                <br/>
                * Datos totalmente ciertos y comprobados científicamente.
              </p>
            </div>
        </div>
      </div>
      <div className={`${styles.ParallaxImage}  ${styles.bg4}`}>  
        <h1 className={styles.whiteText}>¿A dónde vas a viajar hoy?</h1>
        <div id={styles.goButton}>
          <TripSearchGo origin="Barcelona" destination="Madrid"/>
          <TripSearchGo origin="Almeria" destination="Badajoz"/>
          <TripSearchGo origin="Madrid" destination="Valencia"/> 
        </div>
      </div>  

      <div className={`${styles.ParallaxImage}  ${styles.pfooter}`}> 
          <div className={styles.subFooter}>
          <h2>Las rutas más solicitadas</h2>
          <p>Barcelona - Madrid</p>
          <p>Madrid - Valencia</p>
          <p>Madrid - Sevilla</p>
          <p>Torredembarra - Chinchilla</p>
          <p>Mi casa - Tu casa </p>
          </div>
          <div className={styles.subFooter}>
          <h2>Acerca de nosotros</h2>
          <p>Contacto</p>
          <p>Trabaja con nosotros</p>
          <p>Información legal</p>
          <p>Seguridad</p>
          </div>
      </div>




    </div>             
  	)}
		
export default Parallax;