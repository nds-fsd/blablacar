import React, {useEffect } from "react";
import { useForm} from "react-hook-form";
import { Request } from "../../utils/apiWrapper";
import styles from "./newUser.module.css"

export const NewUser=()=>{
const {register, handleSubmit,formState:{errors}} = useForm();   

const userSubmit=async(data)=>{
console.log(data)
         const body = {
                        name:data.name,
                        surname:data.surname,
                        email:data.email,
                        Birthday:data.Birthday,
                        treatment:data.treatment,
                        password:data.password
                    }

                let res = await Request("/users","POST",body)

                if(res?.error){
                    alert(res.message)
                }else{
                  alert("usuario creado con exito")
                }         

            
}
const usrError=(data)=>{
  console.log(data)
}
// creo una función ocn un regexp para ver que es una string tipo mail
const isValidEmail = (email) =>{  
  console.log(email);
   // eslint-disable-next-line
  let checkEmail=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
  console.log(checkEmail);
  return checkEmail
}  ;

return(
    <form onSubmit={handleSubmit(userSubmit, usrError)} className={styles.newInput}>
        <h3 className={styles.newUserTitle}>Crea tu cuenta</h3>
                <input placeholder="Nombre" className={styles.textbox}{...(register("name", {required:true,minLength:3,maxLength:20}))}/>
                {errors.name && errors.name.type==="required" && <p className="emptyField">Este campo es obligatorio</p>}
                {errors.name && errors.name.type==="minLength" && <p className="emptyField">El mínimo  número de caracteres es 3</p>}
                {errors.name && errors.name.type==="maxLength" && <p className="emptyField">El nombre n puede exceder de 20 caracteres</p>}
                <input placeholder="Apellidos" className={styles.textbox}{...(register("surname", {required:true,minLength:3,maxLength:20}))}/>
                {errors.surname && errors.surname.type==="minLength" && <p className="emptyField">El mínimo  número de caracteres es 3</p>}
                {errors.surname && errors.surname.type==="required" && <p className="emptyField">Este campo es obligatorio</p>}
                {errors.surname && errors.surname.type==="maxLength" && <p className="emptyField">El nombre n puede exceder de 20 caracteres</p>}
                <input placeholder="Email" className={styles.textbox}{...(register("email", {required:true, validate:{invalid: v=> isValidEmail(v)===true}}))}/>
                {errors.email && errors.email.type==="invalid" && <p className="emptyField">Email no válido</p>}
                {errors.email && errors.email.type==="required" && <p className="emptyField">Este campo es obligatorio</p>}
                <input type="date" placeholder="DD/MM/YYYY" className={styles.textbox}{...(register("Birthday", {required:true, valueAsDate:true}))}/>
                {errors.Birthday && errors.Birthday.type==="required" && <p className="emptyField">Este campo es obligatorio</p>}
                <select id="treatment" className={styles.textbox} name="Tratamiento" {...(register("treatment", {validate:(e)=>e!==""}))}>
                    <option value="">Tratamiento</option>
                    <option value="Sra.">Sra.</option>
                    <option value="Sr.">Sr.</option>
                    <option value="Srta.">Srta.</option>
                    <option value="NotSay">Prefiero no decirlo</option>
                </select>
                {errors.treatment && <p className="emptyField">Este campo es obligatorio</p>}
                <input placeholder="Password" className={styles.textbox}{...(register("password", {required:true,minLength:3,maxLength:20}))}/>
                {errors.password && errors.password.type==="required" && <p className="emptyField">Este campo es obligatorio</p>}
                {errors.password && errors.password.type==="minLength" && <p className="emptyField">El mínimo  número de caracteres es 3</p>}
                {errors.password && errors.password.type==="maxLength" && <p className="emptyField">El nombre n puede exceder de 20 caracteres</p>}
               
                <input type='submit'className={styles.textbox}/>
                  
        
    </form>
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