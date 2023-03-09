import { useForm} from "react-hook-form";
import styles from "./editDataForms.module.css";
import { Request } from "../../utils/apiWrapper";
import { getUserToken } from "../../utils/storage";

const EditMainDataFrom = ({setEditData, userId, setChange, change, myData}) =>{

    const {register, handleSubmit,formState:{errors}} = useForm({defaultValues:myData}); 
    const jwtToken = getUserToken().jwtToken;
    const dataSubmit=async(data)=>{
        setEditData(false);
        
                 const body = {
                                firstName:data.name,
                                surname:data.surname,
                                email:data.email,
                                birthday:data.Birthday,
                                treatment:data.treatment
                            }
        
                        let res = await Request(`/users/${userId}`,"PATCH",body, {"authorization" : `bearer ${jwtToken}`})
        
                        if(res?.error){
                            alert(res.message)
                        }else{
                          alert("Datos editados con exito")
                          setChange(!change)
                        }                        
        }
        const usrError=(data)=>{
          console.log(data)
        }
        // creo una función con un regexp para ver que es una string tipo mail
        const isValidEmail = (email) =>{  
           // eslint-disable-next-line
          let checkEmail=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
          return checkEmail
        };
        return(
             <form onSubmit={handleSubmit(dataSubmit, usrError)}>
                        <p><strong>Nombre:</strong></p>
                            <input className={styles.textbox}{...(register("name", {required:true,minLength:3,maxLength:20}))}/>
                            {errors.name && errors.name.type==="required" && <p className={styles.emptyfield}>Este campo es obligatorio</p>}
                            {errors.name && errors.name.type==="minLength" && <p className={styles.emptyfield}>El mínimo  número de caracteres es 3</p>}
                            {errors.name && errors.name.type==="maxLength" && <p className={styles.emptyfield}>El nombre n puede exceder de 20 caracteres</p>}
                        <p><strong>Apellido:</strong></p>
                            <input className={styles.textbox}{...(register("surname", {required:true,minLength:3,maxLength:20}))}/>
                            {errors.surname && errors.surname.type==="minLength" && <p className={styles.emptyfield}>El mínimo  número de caracteres es 3</p>}
                            {errors.surname && errors.surname.type==="required" && <p className={styles.emptyfield}>Este campo es obligatorio</p>}
                            {errors.surname && errors.surname.type==="maxLength" && <p className={styles.emptyfield}>El nombre n puede exceder de 20 caracteres</p>}
                        <p><strong>Correo electrónico:</strong></p>
                            <input className={styles.textbox}{...(register("email", {required:true, validate:{invalid: v=> isValidEmail(v)===true}}))}/>
                            {errors.email && errors.email.type==="invalid" && <p className={styles.emptyfield}>Email no válido</p>}
                            {errors.email && errors.email.type==="required" && <p className={styles.emptyfield}>Este campo es obligatorio</p>}
                        <p><strong>Día de nacimiento:</strong></p>
                            <input type="date" className={styles.textbox}{...(register("Birthday", {required:true, valueAsDate:true}))}/>
                            {errors.Birthday && errors.Birthday.type==="required" && <p className={styles.emptyfield}>Este campo es obligatorio</p>}
                        <p><strong>Tratamiento:</strong></p>
                            <select id="treatment" className={styles.textbox} name="Tratamiento" {...(register("treatment", {validate:(e)=>e!==""}))}>
                                <option value="">Tratamiento</option>
                                <option value="Sra.">Sra.</option>
                                <option value="Sr.">Sr.</option>
                                <option value="Srta.">Srta.</option>
                                <option value="NotSay">Prefiero no decirlo</option>
                            </select>
                            {errors.treatment && <p className={styles.emptyfield}>Este campo es obligatorio</p>}
                                
                                <input type='submit'className={styles.submit}/>
                    </form>
)}


const EditExtraDataForm = ({setEditExtraData, userId, setChange, change, myData}) =>{
    const {register, handleSubmit, formState:{errors}} = useForm({defaultValues:myData}); 
    const jwtToken = getUserToken().jwtToken;
    const extraDataSubmit=async(data)=>{
        setEditExtraData(false);
                 const body = {
                                talker:data.talker,
                                music:data.music,
                                smoker:data.smoker,
                                pets:data.pets
                            }
                            console.log("BODY",body)
                        let res = await Request(`/users/${userId}`,"PATCH",body,{"authorization" : `bearer ${jwtToken}`})
                        if(res?.error){
                            alert(res.message)
                        }else{
                          alert("Datos editados con exito")
                          setChange(!change)
                        }                        
        }

        const usrError=(data)=>{
            console.log(data)
          }

        return(
            <form onSubmit={handleSubmit(extraDataSubmit, usrError)}>
                        <p><strong>Hablador:</strong></p>
                            <select id="talker" className={styles.textbox} name="talker" {...(register("talker", {validate:(e)=>e!==""}))}>
                                <option value=""></option>
                                <option value="Poco hablador">Poco hablador</option>
                                <option value="Hablo cuando me siento comodo">Hablo cuando me siento comodo</option>
                                <option value="Muy hablador">Muy hablador</option>
                            </select>
                            {errors.treatment && <p className={styles.emptyfield}>Este campo es obligatorio</p>}
                        <p><strong>Musica:</strong></p>
                            <select id="music" className={styles.textbox} name="music" {...(register("music", {validate:(e)=>e!==""}))}>
                                <option value=""></option>
                                <option value="Prefiero viajar sin musica">Prefiero viajar sin musica</option>
                                <option value="Me es indiferente">Me es indiferente</option>
                                <option value="Me gusta viajar con musica">Me gusta viajar con musica</option>
                            </select>
                            {errors.treatment && <p className={styles.emptyfield}>Este campo es obligatorio</p>}
                        <p><strong>Fumar:</strong></p>
                            <select id="smoker" className={styles.textbox} name="smoker" {...(register("smoker", {validate:(e)=>e!==""}))}>
                                <option value=""></option>
                                <option value="Fumador">Fumador</option>
                                <option value="No fumador">No fumador</option>
                            </select>
                            {errors.treatment && <p className={styles.emptyfield}>Este campo es obligatorio</p>}
                        <p><strong>Mascotas:</strong></p>
                            <select id="pets" className={styles.textbox} name="pets" {...(register("pets", {validate:(e)=>e!==""}))}>
                                <option value=""></option>
                                <option value="Prefiero viajar sin mascotas">Prefiero viajar sin mascotas</option>
                                <option value="No me importa viajar con mascotas">No me importa viajar con mascotas</option>
                            </select>
                            {errors.treatment && <p className={styles.emptyfield}>Este campo es obligatorio</p>}
                        <input type='submit'className={styles.submit}/>
            </form>
        )
}

const EditCarForm = ({setEditCar, userId, setChange, change, myData}) =>{
    const {register, handleSubmit, formState:{errors}} = useForm({defaultValues:myData});
    const jwtToken = getUserToken().jwtToken; 
    const carSubmit=async(data)=>{
        setEditCar(false);
                 const body = {
                                car:{numberPlate:data.numberPlate,
                                model:data.model}
                                
                            }
        
                        let res = await Request(`/users/${userId}`,"PATCH",body, {"authorization" : `bearer ${jwtToken}`})
                        if(res?.error){
                            alert(res.message)
                        }else{
                          alert("Datos editados con exito")
                          setChange(!change)
                        }                        
        }

        const usrError=(data)=>{
            console.log(data)
          }

        return(
            <form onSubmit={handleSubmit(carSubmit, usrError)}>
                        <p><strong>Matrícula:</strong></p>
                            <input className={styles.textbox}{...(register("numberPlate", {required:true}))}/>
                            {errors.numberPlate && errors.numberPlate.type==="required" && <p className={styles.emptyfield}>Este campo es obligatorio</p>}
                            <p><strong>Modelo:</strong></p>
                            <input className={styles.textbox}{...(register("model", {required:true}))}/>
                            {errors.model && errors.model.type==="required" && <p className={styles.emptyfield}>Este campo es obligatorio</p>}
                            <input type='submit'className={styles.submit}/>
            </form>
        )
}



export {EditMainDataFrom, EditExtraDataForm, EditCarForm}