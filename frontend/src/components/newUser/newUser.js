import React, { useState } from "react";
import { useForm , Controller} from "react-hook-form";
import { Request } from "../../utils/apiWrapper";
import styles from "./newUser.module.css"
import ConfigIcon from "../IconConfig/iconsize_small";
import { AiOutlineEye} from "react-icons/ai"
import { setStorageObject } from "../../utils/storage";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider} from "@mui/x-date-pickers";
import { TextField } from "@mui/material";
import dayjs from "dayjs";
import 'dayjs/locale/es';
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone"


export const NewUser=({refresh , setRefresh})=>{
const {register, control, handleSubmit,formState:{errors}} = useForm();   
const [passview,setPassview]=useState(false)
const changePassview=()=>{
  setPassview(!passview)
}
const navigate=useNavigate()
const [fechaNacimiento,setFechaNacimiento]=useState(dayjs())
const userSubmit=async(data)=>{
         const body = {
                        firstName:data.name,
                        surname:data.surname,
                        email:data.email,
                        Birthday:data.Birthday,
                        treatment:data.treatment,
                        password:data.password,
                        talker:undefined,
                        music:undefined,
                        smoker:undefined,
                        pets:undefined
                    }
                console.log(body);        
                let res = await Request("/users","POST",body)

                if(res?.error){
                    alert(res.message)
                }else{
                  if (res.jwtToken){
                    console.log(res);
                    setStorageObject("user-session",res);
                    navigate("/")
                    
                    
                    }  
                }         

            
}
const usrError=(data)=>{
}
// creo una función con un regexp para ver que es una string tipo mail
const isValidEmail = (email) =>{  
   // eslint-disable-next-line
  let checkEmail=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
  return checkEmail
};
const isValidPassword = (passw) =>{  
   // eslint-disable-next-line
  let checkPassw=/^(?=.*([A-Z]){1,})(?=.*[!@#$&*]{1,})(?=.*[0-9]{1,})(?=.*[a-z]{1,}).{3,100}$/.test(passw)
  return checkPassw
}

return(
    <div className={styles.parappa}>
    <form onSubmit={handleSubmit(userSubmit, usrError)} className={styles.form}>
        <h3 className={styles.newUserTitle}>Crea tu cuenta</h3>
                <input placeholder="Nombre" className={styles.textbox}{...(register("name", {required:true,minLength:3,maxLength:20}))}/>
                {errors.name && errors.name.type==="required" && <p className={styles.emptyfield}>Este campo es obligatorio</p>}
                {errors.name && errors.name.type==="minLength" && <p className={styles.emptyfield}>El mínimo  número de caracteres es 3</p>}
                {errors.name && errors.name.type==="maxLength" && <p className={styles.emptyfield}>El nombre n puede exceder de 20 caracteres</p>}
                <input placeholder="Apellidos" className={styles.textbox}{...(register("surname", {required:true,minLength:3,maxLength:20}))}/>
                {errors.surname && errors.surname.type==="minLength" && <p className={styles.emptyfield}>El mínimo  número de caracteres es 3</p>}
                {errors.surname && errors.surname.type==="required" && <p className={styles.emptyfield}>Este campo es obligatorio</p>}
                {errors.surname && errors.surname.type==="maxLength" && <p className={styles.emptyfield}>El nombre n puede exceder de 20 caracteres</p>}
                <input placeholder="Email" className={styles.textbox}{...(register("email", {required:true, validate:{invalid: v=> isValidEmail(v)===true}}))}/>
                {errors.email && errors.email.type==="invalid" && <p className={styles.emptyfield}>Email no válido</p>}
                {errors.email && errors.email.type==="required" && <p className={styles.emptyfield}>Este campo es obligatorio</p>}
                <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es" >
                    <Controller
                    control={control}
                    defaultValue={fechaNacimiento}
                    name="Birthday"
                    rules={{required:true}}
                    render={
                        ({ field: { onChange, onBlur, value, ref } }) => (
                    <DatePicker
                        className={styles.fechas}
                        label="DD/MM/AAAA"
                        onChange={(e) => {onChange(e);setFechaNacimiento(e);}}
                        value={fechaNacimiento}
                        renderInput={(params) => <TextField {...params}/>} />)}/>
                   {errors.originDate && errors.originDate.type==="required" && <p className={styles.emptyfield}>Este campo es obligatorio</p>}
                   </LocalizationProvider>
                <select id="treatment" className={styles.textbox} name="Tratamiento" {...(register("treatment", {validate:(e)=>e!==""}))}>
                    <option value="">Tratamiento</option>
                    <option value="Sra.">Sra.</option>
                    <option value="Sr.">Sr.</option>
                    <option value="Srta.">Srta.</option>
                    <option value="NotSay">Prefiero no decirlo</option>
                </select>
                {errors.treatment && <p className={styles.emptyfield}>Este campo es obligatorio</p>}
                <div className={styles.wrapper}>
                <input placeholder="Password" type={passview?"text":"password"} className={styles.password}{...(register("password", {required:true,minLength:3,maxLength:20, validate:{invalid: v=> isValidPassword(v)===true}}))}/><ConfigIcon class={styles.icon} ><AiOutlineEye onClick={changePassview}/></ConfigIcon>
                </div>
                {errors.password && errors.password.type==="required" && <p className={styles.emptyfield}>Este campo es obligatorio</p>}
                {errors.password && errors.password.type==="minLength" && <p className={styles.emptyfield}>El mínimo número de caracteres es 3</p>}
                {errors.password && errors.password.type==="maxLength" && <p className={styles.emptyfield}>El password no puede exceder de 20 caracteres</p>}
                {errors.password && errors.password.type==="invalid" && <p className={styles.emptyfield}>Password debe contener 1 mayúscula, 1 dígito y un carácter especial</p>}
               
                <Button  type='submit' bsPrefix="goTrip">Crea tu cuenta</Button>
                  
        
    </form>
    </div>
)
 }


// import { useForm } from "react-hook-form";

// export function NewUser() {
//   const { register, handleSubmit, formState: { errors } } = useForm();
//   const onSubmit = data => console.log(data);
//   const onError = data => console.log(data);


//   return (

//     <form onSubmit={handleSubmit(onSubmit, onError)}>
//        <h3 className={styles.newUserTitle}>Crea tu cuenta</h3>

//       <input placeholder="Nombre" {...register("name", { required: true , minLength: 5, maxLength: 20} )} />
//       {(errors.name && errors.name.type==="required") && <span>Campo Obligatorio</span>}         
//       {(errors.name && errors.name.type==="minLength") && <span>La longitud mínima es de 5 caracteres</span>}         
//       {(errors.name && errors.name.type==="maxLength") && <span>La longitud máxima es de 20 caracteres</span>}         
//       {/* include validation with required or other standard HTML validation rules */}
//       <input {...register("exampleRequired", { required: true })} />
//       {/* errors will return when field validation fails  */}
      
      
//       <input type="submit" />
//     </form>
//   );
// }