import React from "react";
import userLogo from "../assets/user.png"
import styles from './UserAvatar.module.css'
const UserAvatar = (props) =>{
console.log(props);
if (props.user && props.picUrl){
    return (<img src={props.picUrl} alt="usuario" className= {styles.userLogo}/>
    )
}else if (props.user){
    return (
    <div className={styles.imgRedonda}>{props.user.charAt(0).toUpperCase()}</div>
    )
}else{
    return(
    <img src={userLogo} alt="usuario" className= {styles.userLogo}/>
    )
}

}


export default UserAvatar