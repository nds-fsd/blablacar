import styles from "./navigation.module.css";
import {BsDistributeVertical} from 'react-icons/bs'
import { useNavigate } from "react-router-dom";
import IconLogo from '../svgIcons/iconLogo'
import {deleteStorageObject} from "../../utils/storage"
import React, { useEffect, useRef, useState } from "react";
import { Navbar, Nav, NavDropdown, Container } from "react-bootstrap";
import {HiMagnifyingGlass, HiOutlinePlusCircle} from 'react-icons/hi2'
import { getStorageObject } from "../../utils/storage";
import UserAvatar from "../userAvatar/UserAvatar";
const Navigation = ( ) => {
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
  userNameRef.current = sessiontoken.userObj.userName
  userPicRef.current = sessiontoken.userObj.picUrl
  setToken(sessiontoken.jwtToken)
  console.log(tokenRef.current);
  console.log(userNameRef.current)
  }
  }
  
})



   const logOut = () =>{
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
        <Nav.Link href="/Trips"><HiOutlinePlusCircle size={38} className={` mr-auto ${styles.glass}`}/></Nav.Link>
        <NavDropdown id="basic-nav-dropdown" title={<UserAvatar user={userNameRef.current} picUrl={userPicRef.current} className="mr-auto"/>}>
          {console.log(tokenRef.current)}
          {console.log(userNameRef.current)}
          {!tokenRef.current?
            (<><NavDropdown.Item href="/login" onClick={logOut}>Inicia Sesión</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="/users">Regístrate</NavDropdown.Item></>)
            :
            (<>            
            <NavDropdown.Item href={`/rides`}>Tus viajes</NavDropdown.Item>
            <NavDropdown.Item href={`/messages`}>Mensajes</NavDropdown.Item>
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