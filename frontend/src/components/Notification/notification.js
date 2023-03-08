import React from 'react';
import { useEffect, useState } from "react";
import { Request } from "../../utils/apiWrapper";
import { getUserToken } from "../../utils/storage";
import { NotificationCard } from '../NotificationCard/NotificationCard';
import styles from './notification.module.css'
const Notification=(props)=> {

const [notifications,setNotifications] = useState([])
const [refresh,setRefresh]=useState(true)
const userId = getUserToken().userObj.userID
const getNotifications = async() =>{   
        const response = await Request(`/notification/${userId}`)
        console.log("response",response)
        setNotifications(response)
}
    
useEffect(()=>{
    getNotifications()
    console.log("notifications es", notifications);
},[refresh])

  return (
   
  <div className={styles.parappa}>

{notifications.length>0?notifications.map((e)=> 
<NotificationCard refresh={refresh} setRefresh={setRefresh} key ={e._id} id={e._id} title={e.title} body={e.body} read={e.read} date={e.date} deleted={e.deleted}/>
):""
}

</div>)}


export default Notification

















