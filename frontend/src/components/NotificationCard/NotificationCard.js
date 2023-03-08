import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import styles from "./NotificationCard.module.css"
import { diaSemana, mesFecha } from "../../utils/dateWorks";
import { Request } from "../../utils/apiWrapper";

export const NotificationCard = (props)=>{
    const [show,setShow]=useState(false)
    const [toDelete,setToDelete]=useState(false)
    const [read,setRead]= useState(props.read)
    const fecha = new Date(props.date)     
    const dia=diaSemana(fecha)
    const mes=mesFecha(fecha)
    const inputStyle={
        width:"1rem",
        height:"1rem"
    }

    const delMessage=async()=>{
        console.log(props);
        const notiReadUpdate=await Request(`/notification/${props.id}`,"DELETE")
        console.log(notiReadUpdate);
        props.setRefresh(!props.refresh)
    }
    
    
useEffect(()=>{
    const setNotificationStatus=async(status)=>{
        const body={
            read:status
        }
        console.log(props);
        const notiReadUpdate=await Request(`/notification/${props.id}`,"PATCH",body)
        console.log(notiReadUpdate);
    }
    setNotificationStatus(read)
},[read])
return (
    <Card bsPrefix="notiSummary"  className={`styles.${props.deleted?"":"not"}deleted, styles.${props.read?"read":"unread"}`}>
        <div onClick={(e)=>setShow(!show)} className={styles.cardTop}>
        <p>{dia},{fecha.getDay()} de {mes}</p>
        <p>{props.title}</p>
        </div>
        {show && 
        <div className={styles.cardBottom}>
            <p>{props.body}</p>
            <div className={styles.cardInput}>
                <p>Marcar como leido</p>
                <input type="checkbox" onChange={(e)=>setRead(!read)} style={inputStyle} checked={read} />
            </div>
            {read&&<p className={styles.delText} onClick={e=>setToDelete(!toDelete)}>¿Deseas borrar el mensaje?</p>}
            {read&&toDelete&& <p className={styles.delText} onClick={e=>delMessage()}>Confirmar</p>} 
        </div>
        }
       


    </Card>

)
}
