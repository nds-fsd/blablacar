import React, { Children } from "react";
import userLogo from "../assets/user.png"
import styles from './UserAvatar.module.css'
const UserAvatar = (props) =>{
const localization = props.localization
if (props.user && props.picUrl){
    return (
    <div className={styles.userAvatar}>
    <img src={props.picUrl} alt="usuario" className= {styles.userLogo}/>
    {props.showName?<h3>{props.user}</h3>:""}
    </div>
    )
}else if (props.user){
    return (
    <div className={styles.userAvatar}>
    <div className={localization === "navBar" ? styles.imgRedonda : styles.imgProfile}>{props.user.charAt(0).toUpperCase()}</div>
    {props.showName?<h3>{props.user}</h3>:""}
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