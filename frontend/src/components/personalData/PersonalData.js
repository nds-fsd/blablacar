import { useEffect, useRef, useState } from "react";
import { Request } from "../../utils/apiWrapper";
import { getUserToken } from "../../utils/storage";
import styles from "./personalData.module.css";
import {CiEdit, CiEraser} from 'react-icons/ci'
import UserAvatar from "../userAvatar/UserAvatar";
import { getStorageObject } from "../../utils/storage";

export const PersonalData  = () =>{
    const [myData, setMyData] = useState("")
    const userId = getUserToken().userObj.userID
    useEffect(()=>{
        const getMyData = async() =>
        {
            const response = await Request(`/users/${userId}`)
            setMyData(response)
        }
        getMyData()
    },[])   


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
  console.log(tokenRef.current);
  console.log(userNameRef.current)
  console.log("usr.Obj", sessiontoken.userObj)
  }
  }
  
})

    const firstName = myData.name;
    const surname = myData.surname;
    const birthday = myData.Birthday;
    const email = myData.email;
    const treatment = myData.treatment;
    const talker = undefined;
    const music = undefined;
    const smoker = undefined;
    const pets = undefined;
    const numberPlate = undefined;
    const model = undefined;

    return (
        <>
            <div>
                <div className={styles.title}>
                    <div><strong>Datos Personales</strong></div>
                    <div><CiEdit size={37} className={styles.editButton}/></div>
                </div>
                <div className={styles.datawrapper}>
                    <div className={styles.fotoWrapper}>
                        <div><UserAvatar user={userNameRef.current} picUrl={userPicRef.current} className='mr-auto'/></div>
                        <div className={styles.fotoButtons}>
                            <div><CiEdit size={37} className={styles.editButton}/></div>
                            <div><CiEraser size={37} className={styles.editButton}/></div>
                        </div>
                    </div>
                    <div className={styles.userData}>
                        <p><strong>Nombre:</strong></p>
                        <p>{firstName}</p>
                        <p><strong>Apellido:</strong></p>
                        <p>{surname}</p>
                        <p><strong>Corro electrónico:</strong></p>
                        <p>{email}</p>
                        <p><strong>Tratamiento:</strong></p>
                        <p>{treatment}</p>
                        <p><strong>Día de nacimiento:</strong></p>
                        <p>{birthday}</p>
                    </div>
                </div>
                <div className={styles.title}>
                    <div><strong>¡Que te conozcan tus compañeros!</strong></div>
                    <div><CiEdit size={37} className={styles.editButton}/></div>
                </div>
                <div className={styles.additionalData}>
                        <p><strong>Hablador:</strong></p>
                        <p>{talker}</p>
                        <p><strong>Música:</strong></p>
                        <p>{music}</p>
                        <p><strong>Fumar:</strong></p>
                        <p>{smoker}</p>
                        <p><strong>Mascotas:</strong></p>
                        <p>{pets}</p>
                </div>
                <div className={styles.title}>
                    <div><strong>¡Añade tu coche!</strong></div>
                    <div><CiEdit size={37} className={styles.editButton}/></div>
                </div>
                <div className={styles.additionalData}>
                        <p><strong>Modelo:</strong></p>
                        <p>{model}</p>
                        <p><strong>Matrícula:</strong></p>
                        <p>{numberPlate}</p>
                </div>
            </div>

        </>
    )
}