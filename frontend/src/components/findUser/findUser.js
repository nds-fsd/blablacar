import styles from "./findUser.module.css";
import { useLocation } from "react-router-dom";
import userLogo from "../assets/user.png"
import {useState,useEffect } from "react";
import { Request } from "../../utils/apiWrapper";
const FindUser = () =>{
    const location = useLocation()
    console.log(location.state.user)
    const [reload,setReload] = useState(false)
    const [usersFind,setUsersFind] =useState([])
    const [openModal,setModal] = useState(false)
    const updateModal = () =>{
        setModal(!reload)
    }
    const reloadPage = () =>{
        setReload(!reload)
    }
    const apiList = async () =>{
        const api1 = await Request(`/users`)
        setUsersFind(api1)
        console.log(usersFind)
    }
    useEffect(() => {    
        apiList()
       },[reload])
       const deleteUser = async (id) =>{
        let res = await Request("/users/"+id,"delete")
                    if(res?.error){
                        alert(res.message)
                    }else{
                      alert("Usuario Eliminado")
                      reloadPage();
                      console.log(reload)
                    }                  
        }
        const updateUser = (id) =>{
            setModal(!openModal)

            reloadPage();
            
        }

    return(
        <div className={styles.main}>
            <div className={styles.tittleBody}>
                <div className={styles.tittle}>
                    Usuarios
                </div>   
            </div>
           <div className={styles.userBody}>
           {usersFind.map(user =>{return (
           <div className={styles.user}>
                <div className={styles.header}>
                    <div className={styles.crossText}>
                        <button className={styles.cross} onClick ={() => deleteUser(user._id)}>X</button>
                    </div>
                </div>
                <div className={styles.body}  onClick ={() => updateUser(user._id)} >
                    <div className={styles.fotoUser}>
                        <img src={userLogo} className={styles.userLogo} alt="usuario"/>  
                    </div>
                    <div className={styles.data}>
                        <div className ={styles.dataName}>
                            <div className={styles.name}>{user.treatment}</div>
                            <div className={styles.name}>{user.name}</div>
                        </div>
                        <div className={styles.dataInfo}>
                            <div className={styles.info}>
                                {user.email}
                            </div>
                        </div>
                    </div>
                </div>
           </div>
           )})}
           </div>
        </div>
    )
}
export {FindUser}