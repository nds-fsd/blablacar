import React from "react";
import {HiBell} from 'react-icons/hi2'
import userLogo from "../assets/user.png"
import styles from './UserAvatar.module.css'
const UserAvatar = (props) =>{

const localization = props.localization
if (props.user && props.picUrl){
    return (
    <div className={styles.userAvatar}>
    <img src={props.picUrl} alt="usuario" className= {styles.userLogo}/>
    {props.showName?<h3>{props.user}</h3>:""}
    {props.hasNotifications &&  <HiBell className={styles.bellIcon}/>}
    </div>
    )
}else if (props.user){
    return (
    <div className={styles.userAvatar}>
    <div className={localization === "profile" ? styles.imgProfile : styles.imgRedonda}>{props.user.charAt(0).toUpperCase()}</div>
    {props.showName?<h4 className={styles.nameText}>{props.user}</h4>:""}
    
    {!!props.hasNotifications &&  <HiBell className={styles.bellIcon}/>}


    </div>    
    )
}else{
    return(
    <div className={styles.userAvatar}>
    <img src={userLogo} alt="usuario" className= {styles.userLogo}/>
    </div>
    )
}

}


export default UserAvatar