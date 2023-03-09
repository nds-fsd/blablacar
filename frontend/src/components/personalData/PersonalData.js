import { useEffect, useRef, useState } from "react";
import { Request } from "../../utils/apiWrapper";
import { getUserToken, setSessionObject, setStorageObject } from "../../utils/storage";
import styles from "./personalData.module.css";
import {CiEdit, CiEraser} from 'react-icons/ci'
import UserAvatar from "../userAvatar/UserAvatar";
import { getStorageObject } from "../../utils/storage";
import { useForm} from "react-hook-form";
import { EditCarForm, EditExtraDataForm, EditMainDataFrom } from "./EditDataForms";
import cloudinary from "cloudinary-core";
import { useNavigate } from "react-router-dom";


export const PersonalData  = (props) =>{ 
    const navigate=useNavigate()
    const [change, setChange] = useState(false)
    const [editPic, setEditPic]=useState(false)
    const [myData, setMyData] = useState("")
    const [imageUrl, setImageUrl]= useState('')
    const userId = getUserToken().userObj.userID
    useEffect(()=>{
        const userSession=getStorageObject('user-session')
        const getMyData = async() =>
        {
            const headers={
                Authorization: `Bearer ${userSession.jwtToken}`
            }
            console.log(headers);
            const response = await Request(`/users/${userId}`, "GET", undefined, headers)
            setMyData(response)
        }
        getMyData();
    },[change])   

    const UploadImage = async (event) => {
        const userSession=getStorageObject('user-session')
        const urlCloudinary =
          "https://api.cloudinary.com/v1_1/dwyvktp3k/image/upload";
        const uploadPreset = "pimpamBuga";
        const cloudinaryFolder = "";
    
        const formData = new FormData();
        formData.append("file", event.target.files[0]);
        formData.append("upload_preset", uploadPreset);
        formData.append("folder", cloudinaryFolder);

    
        const options = { method: "POST", body: formData };
        try {
                  const responseCloudinary = await fetch(urlCloudinary, options);
                  
                  const json = await responseCloudinary.json();
                  const cloudinaryCore = new cloudinary.Cloudinary({
                    cloud_name: "dwyvktp3k",
                  });
                  const imgUrl = json.secure_url
                  console.log("RESPONSE", imgUrl);
                  setImageUrl(imgUrl);
                  userPicRef.current = imgUrl;
                  setImageUrl(userPicRef.current)
                //   setSessionObject("picUrl", userPicRef.current);
                  console.log(userPicRef.current);
                  setChange(!change)
                } catch (error) {
                  console.error(error);
                }
        try {
            const headers={
                Authorization: `Bearer ${userSession.jwtToken}`
            }
            const body = {
                picUrl: userPicRef.current
            }
        
        let res = await Request(`/users/${userId}`,"PATCH",body, headers)
        if(res?.error){
            alert(res.message)
        }else{
          setStorageObject('user-session',res)
          window.location.reload()
          
        }         

            } catch (error) {
                console.error(error);
            };
                    
    }


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
  }
  }
  
})

    const firstName = myData.firstName;
    const surname = myData.surname;
    const birthday = myData.Birthday;
    const email = myData.email;
    const treatment = myData.treatment;
    const talker = myData.talker;
    const music = myData.music;
    const smoker = myData.smoker;
    const pets = myData.pets;
    const numberPlate = myData?.car?.numberPlate;
    const model = myData?.car?.model;

    const [editData, setEditData] = useState(false);
    const [editExtraData, setEditExtraData] = useState(false);
    const [editCar, setEditCar] = useState(false);


    return (
        <>
            <div>
                <div className={styles.title}>
                    <div><strong>Datos Personales</strong></div>
                    <div><CiEdit size={37} className={styles.editButton} onClick={() =>{!editData ? setEditData(true) : setEditData(false)}}/></div> {/*QUITAR EMAIL DE PAGINA TERCROS*/}
                </div>
                <div className={styles.datawrapper}>
                    <div className={styles.fotoWrapper}>
                        <div><UserAvatar localization="profile" user={userNameRef.current} picUrl={userPicRef.current} className='mr-auto'/></div>
                        <div className={styles.fotoButtons}>
                            <CiEdit size={37} onClick={(e)=>setEditPic(!editPic)} className={styles.editButton}/>
                            {editPic&&
                            <div className={styles.buttonWrap}>
                            <label htmlFor="files" className="goTrip">Seleccionar Archivo</label>
                            <input id="files" className={styles.fileInput} onChange={(e)=>UploadImage(e)} type="file"/>
                            </div>}
                        </div>
                

                    </div>
                    {!editData ?
                    (<div className={styles.userData}>
                        <p><strong>Nombre:</strong></p>
                        <p>{firstName}</p>
                        <p><strong>Apellido:</strong></p>
                        <p>{surname}</p>
                        <p><strong>Correo electrónico:</strong></p> {/*QUITAR EMAIL DE PAGINA TERCROS*/}
                        <p>{email}</p>                        
                        <p><strong>Día de nacimiento:</strong></p> {/*QUITAR EMAIL DE PAGINA TERCROS*/}
                        <p>{birthday}</p>
                        <p><strong>Tratamiento:</strong></p>
                        <p>{treatment}</p>
                    </div>)
                    :
                    (<EditMainDataFrom setEditData={setEditData} userId={userId} setChange={setChange} change={change} myData={myData}/>)
                    }

                </div>
                <div className={styles.title}>
                    <div><strong>¡Que te conozcan tus compañeros!</strong></div>
                    <div><CiEdit size={37} className={styles.editButton} onClick={()=>{!editExtraData ? setEditExtraData(true) : setEditExtraData(false)}}/></div> {/*QUITAR EMAIL DE PAGINA TERCROS*/}
                </div>
                {!editExtraData ? 
                (<div className={styles.additionalData}>
                        <p><strong>Hablador:</strong></p>
                        <p>{talker}</p>
                        <p><strong>Música:</strong></p>
                        <p>{music}</p>
                        <p><strong>Fumar:</strong></p>
                        <p>{smoker}</p>
                        <p><strong>Mascotas:</strong></p>
                        <p>{pets}</p>
                </div>)
                :
                (<EditExtraDataForm setEditExtraData={setEditExtraData} userId={userId} setChange={setChange} change={change} myData={myData}/>)}
                <div className={styles.title}>
                    <div><strong>¡Añade tu coche!</strong></div>
                    <div><CiEdit size={37} className={styles.editButton} onClick={()=>{!editCar ? setEditCar(true) : setEditCar(false)}}/></div> {/*QUITAR EMAIL DE PAGINA TERCROS*/}
                </div>
                {!editCar ?
                (<div className={styles.additionalData}>
                        <p><strong>Modelo:</strong></p>
                        <p>{model}</p>
                        <p><strong>Matrícula:</strong></p>
                        <p>{numberPlate}</p>
                </div>) 
                :
                (<EditCarForm setEditCar={setEditCar} userId={userId} setChange={setChange} change={change} myData={myData}/>)}
            </div>

        </>
    )
}
