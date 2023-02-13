import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import { BsChevronRight } from "react-icons/bs";
import styles from "./ProfileAccount.module.css";
import {deleteStorageObject} from "../../utils/storage"
import { useNavigate } from "react-router-dom";

const LINKS = [
  {
    text: 'Datos personales',
    link: '/profilemenu'
  },
  {
    text: 'Opiniones dejadas',
    link: '/feedback'
  },
  {
    text: 'Notificaciones, Correos electrónicos y SMS',
    link: '/notifications'
  },
  {
    text: 'Contraseña',
    link: '/password'
  },
  {
    text: 'Transferencias',
    link: '/transfers'
  },

  {
    text: 'Preferencias de cobro',
    link: '/billingpreferences'
  },

  {
    text: 'Pagos y reembolsos',
    link: '/payments'
  },
  {
    text: 'Mis promociones',
    link: '/promotions'
  },

  {
    text: 'Protección de datos',
    link: '/dataprotection'
  },

  {
    text: 'Protección de datos',
    link: '/dataprotection'
  },

]


const ProfileAccount = () => {
  const navigate = useNavigate()
  const logOut = () =>{
    deleteStorageObject("user-session")
    navigate("/")
   }
  
  return (
    <Container>
      <ListGroup>
        {LINKS.map(({text, link}) =>
          <ListGroup.Item className={styles.listItem}>
            <a href={link}className={styles.link}>
            <span>{text}</span><BsChevronRight/> </a>

         
          </ListGroup.Item>)}
          <ListGroup.Item className={styles.listItem}>
          <button className={`${styles.link} ${styles.logoutbtn}`} onClick={logOut}>Cerrar sessión <BsChevronRight/> </button>
          </ListGroup.Item>

      </ListGroup>
    </Container>
  )
}
 
export default ProfileAccount




