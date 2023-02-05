import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import { BsChevronRight } from "react-icons/bs";
import styles from "./ProfileAccount.module.css";

const LINKS = [
  {
    text: 'Cambiar contraseña',
    link: '/recovery'
  },
  {
    text: 'Opiniones dejadas',
    link: '/feedback'
  },
  {
    text: 'Notificaciones',
    link: '/notifications'
  },
]


const ProfileAccount = () => {
  return (
    <Container>
      <ListGroup>
        {LINKS.map(({text, link}) =>
          <ListGroup.Item className={styles.listItem}>
            <a href={link}className={styles.link}>
            <span>{text}</span><BsChevronRight/> </a>

          </ListGroup.Item>)}
      </ListGroup>
    </Container>
  )
}
 
export default ProfileAccount




