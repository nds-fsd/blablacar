import styles from "./navigation.module.css";
import { useLocation, useNavigate } from "react-router-dom";
import IconLogo from '../svgIcons/iconLogo'
import {deleteStorageObject} from "../../utils/storage"
import React, { useEffect, useRef, useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import {HiMagnifyingGlass, HiOutlinePlusCircle} from 'react-icons/hi2'
import { getStorageObject } from "../../utils/storage";
import UserAvatar from "../userAvatar/UserAvatar";
import { Request } from "../../utils/apiWrapper";




const Navigation = ({setOpenModal, setWhatModal , refresh , setRefresh} ) => {
const navigate=useNavigate()
let tokenRef=useRef()
let userNameRef=useRef()
let userPicRef=useRef()
const [token,setToken]=useState("")
const [ID,setID]=useState("")
const [notifications,setnotifications] = useState(0)
const [hasNotifications,setHasNotifications]=useState(false)

const getNotifications = async() =>
    {
        const session = getStorageObject("user-session")
        const response = await Request(`/notification/${session.userObj.userID}`)
        const numberOfNotifications = response.filter(notification => notification.read === false).length
        

        if (numberOfNotifications!==0){
        setHasNotifications(true)
        setnotifications(numberOfNotifications)
        }
    }
useEffect(()=>{
  if(!token){ 
  const sessiontoken = getStorageObject("user-session")
  if (sessiontoken){
  tokenRef.current = sessiontoken.jwtToken
  userNameRef.current = sessiontoken.userObj.userName
  userPicRef.current = sessiontoken.userObj.picUrl
  setToken(sessiontoken.jwtToken)
  setID(sessiontoken.userObj.userID)
  getNotifications()
  }
  }
  
})




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
          <UserAvatar hasNotifications={hasNotifications} localization="navBar" user={userNameRef.current} picUrl={userPicRef.current} className="mr-auto"/>
          </div>
          }>
          {!tokenRef.current?
            (<><NavDropdown.Item onClick={()=>{navigate("/login");setOpenModal(true); setWhatModal("Login")}} >Inicia Sesión</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item onClick={()=>{navigate("/users");setOpenModal(true); setWhatModal("NewUser")}}>Regístrate</NavDropdown.Item></>)
            :
            (<>            
            <NavDropdown.Item href={`/rides`}>Tus viajes</NavDropdown.Item>
            {hasNotifications?
            <NavDropdown.Item href={`/notifications`}>Notificaciones ({notifications})</NavDropdown.Item>
            :
            <NavDropdown.Item href={`/notifications`}>Notificaciones</NavDropdown.Item>}
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