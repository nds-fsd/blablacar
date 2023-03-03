import React from 'react';
import { BiBell } from 'react-icons/bi'; // Importa el icono de notificación
import { Dropdown } from 'react-bootstrap'; // Importa el componente Dropdown de react-bootstrap
import { useEffect, useState } from "react";
import { Request } from "../../utils/apiWrapper";
import { getUserToken } from "../../utils/storage";

function Notification(props) {

const [notifications,setNotifications] = useState([])
const userId = getUserToken().userObj.userID

useEffect(()=>{
    const getNotifications = async() =>
    {
        const response = await Request(`/notification/${userId}`)
        setNotifications(response)
    }
    getNotifications()
},[])

  return (
   
  <div>

{notifications.map(({message, date, status})=> <li>{message}-{status}-{date}</li>)}
 
  </div> )}


export default Notification;

















