import styles from "./navigation.module.css";
import { useNavigate } from "react-router-dom";
import IconLogo from '../svgIcons/iconLogo'
import {deleteStorageObject} from "../../utils/storage"
import React, { useEffect, useRef, useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import {HiMagnifyingGlass, HiOutlinePlusCircle,HiBell} from 'react-icons/hi2'
import { getStorageObject } from "../../utils/storage";
import UserAvatar from "../userAvatar/UserAvatar";
import { getUserToken } from "../../utils/storage";
import { Request } from "../../utils/apiWrapper";



const Navigation = ({setOpenModal, setWhatModal} ) => {
const navigate=useNavigate()
let tokenRef=useRef()
let userNameRef=useRef()
let userPicRef=useRef()
const [token,setToken]=useState("")

useEffect(()=>{
  if(!token){
  const sessiontoken = getStorageObject("user-session")
  if (sessiontoken){
  tokenRef.current = sessiontoken.jwtToken
  userNameRef.current = sessiontoken.userObj.surname
  userPicRef.current = sessiontoken.userObj.picUrl
  setToken(sessiontoken.jwtToken)
  }
  }
  
})

const [hasNotifications,setHasNotifications] = useState(0)
const userId = getUserToken()?.userObj?.userID

useEffect(()=>{
    const getNotifications = async() =>
    {
        const response = await Request(`/notification/${userId}`)
        const numberOfNotifications = response.filter(notification => notification.status === 'unread').length
        console.log({response,numberOfNotifications})


        setHasNotifications(numberOfNotifications)
    }
    if (userId) getNotifications();
},[userId])


console.log({hasNotifications})




   const logOut = () =>{
    setHasNotifications(0)
    deleteStorageObject("user-session")
    setToken("")
    userNameRef.current=""
    userPicRef.current=""
    tokenRef.current=""
    navigate("/")
   }
  return(
  <Navbar bg="white" expand="lg" id={styles.navbar}>
    <Container>
      <Navbar.Brand href="/">
        <IconLogo className={styles.logoSvg}/>
        PimPamBuga
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav"></Navbar.Toggle>
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
        <Nav className="justify-content-end">
        <Nav.Link href="/search"><HiMagnifyingGlass size={38} className={` mr-auto ${styles.glass}`}/></Nav.Link>
        {tokenRef.current&&<Nav.Link onClick={()=>{navigate("/trips");setOpenModal(true); setWhatModal("NewTrip")}}><HiOutlinePlusCircle size={38} className={` mr-auto ${styles.glass}`}/></Nav.Link>}
        <NavDropdown id="basic-nav-dropdown" title={
         
          
          <div className={styles.wrapperUserAvatar}>
    
          {!!hasNotifications &&  <HiBell className={styles.bellIcon}/>}
<UserAvatar localization="navBar" user={userNameRef.current} picUrl={userPicRef.current} className="mr-auto"/>


          </div>
          
        
        }>
          {!tokenRef.current?
            (<><NavDropdown.Item onClick={()=>{navigate("/login");setOpenModal(true); setWhatModal("Login")}} >Inicia Sesión</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={()=>{navigate("/users");setOpenModal(true); setWhatModal("NewUser")}}>Regístrate</NavDropdown.Item></>)
            :
            (<>            
            <NavDropdown.Item href={`/rides`}>Tus viajes</NavDropdown.Item>
            <NavDropdown.Item href={`/messages`}>Mensajes</NavDropdown.Item>
            <NavDropdown.Item href={`/notifications`}>Notificaciones</NavDropdown.Item>
            <NavDropdown.Item href={`/profile`}>Perfil</NavDropdown.Item>
            <NavDropdown.Item href={`/money-available`}>Transferencias</NavDropdown.Item>
            <NavDropdown.Item href={`/payments-history`}>Pagos y reembolsos</NavDropdown.Item>
            <NavDropdown.Item onClick={logOut}>Cerrar Sesión</NavDropdown.Item>
            </>)
          }
        </NavDropdown>
        </Nav> 
        </Navbar.Collapse>
    </Container>
  </Navbar>    
)}

export default Navigation