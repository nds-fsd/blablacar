import React, { useEffect, useState } from "react";
import { Autocomplete, TextField } from "@mui/material";
import styles from "./newTrip.module.css";
import { Radarrequest, Request } from "../../utils/apiWrapper";
import { getUserToken } from "../../utils/storage";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers";
import { useForm , Controller } from "react-hook-form";


import dayjs from "dayjs";
import 'dayjs/locale/es';
import { Button } from "react-bootstrap";
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone";
import { AutocompleteField } from "../MapsAPI/Autocomplete";
export const NewTrip = () =>{
    dayjs.extend(utc)
    dayjs.extend(timezone)
    const [autofillValues, setAutofillValues] = useState("")
    const [autofillOptions, setAutofillOptions] = useState([])
    const [fechaSalida,setFechaSalida]=useState(dayjs())
    const [horaSalida,setHoraSalida]=useState(dayjs())
    const [horaLlegada,setHoraLlegada]=useState(dayjs())
    const {register, control, handleSubmit,formState:{errors}} = useForm();   
    const userId = getUserToken().userObj.userID
    const tripSubmit = async(data) => {
        const body = {
                origin: data.origin,         
                originDate: data.originDate,
                destination: data.destination,    
                departureTime: data.departureTime,
                arrivalTime:data.arrivalTime,
                seat:data.seats,           
                price:data.price               
        }
        const userSession = getUserToken()
          let headers = {
            Authorization: `Bearer ${userSession.jwtToken}`,
          };
        let res = await Request ("/users/"+userId+"/newtrip","POST",body,headers)
        if(res?.error){
            alert(res.message)
        }else{
            alert(`viaje creado con destino a ${body.destination}`)
        }
    } 
    const tripError=(data)=>{
        console.log(data);
    }

    useEffect(()=>{
    const getOptions = async (value) =>{
        console.log(value)
        if(value.length > 3) {
        const res = await Radarrequest (`/autocomplete?query=${value}`, "GET", undefined, undefined);
        console.log(res);
        setAutofillOptions([])
        let optionsResults = []
        res.addresses.map((e)=>{
            optionsResults.push(e.formattedAddress)
        })
        setAutofillOptions(optionsResults);
        console.log("ResOptions", optionsResults)}
        if(value.length === 0) {
            setAutofillOptions([])
        }
    }
    if (autofillValues){
        const newOptions=getOptions(autofillValues)
        console.log(newOptions);
    }


},[autofillValues])
    return(
        <div className={styles.parappa}>
        
        <form onSubmit={handleSubmit(tripSubmit, tripError)} className={styles.newInput}>
            <h3 className={styles.newUserTitle}>Crea tu viaje</h3>

            <Controller
                    control={control}
                    defaultValue={"Origen"}
                    name="origin"
                    rules={{required:true}}
                    render={
                        ({ field: { onChange, onBlur, value, ref } }) => (
                    <AutocompleteField onChange={onChange}/>)}/>
                   {errors.originDate && errors.originDate.type==="required" && <p className={styles.emptyfield}>Este campo es obligatorio</p>}
                   

                    {/* <input placeholder="Origen" className={styles.textbox}{...(register("origin", {required:true,minLength:3,maxLength:20}))}/>
                    {errors.origin && errors.origin.type==="required" && <p className={styles.emptyfield}>Este campo es obligatorio</p>}
                    {errors.origin && errors.origin.type==="minLength" && <p className={styles.emptyfield}>El mínimo  número de caracteres es 3</p>}
                    {errors.origin && errors.origin.type==="maxLength" && <p className={styles.emptyfield}>El campo no puede exceder de 20 caracteres</p>} */}
                    <input placeholder="Destino" className={styles.textbox}{...(register("destination", {required:true,minLength:3,maxLength:20}))}/>
                    {errors.destination && errors.destination.type==="minLength" && <p className={styles.emptyfield}>El mínimo  número de caracteres es 3</p>}
                    {errors.destination && errors.destination.type==="required" && <p className={styles.emptyfield}>Este campo es obligatorio</p>}
                    {errors.destination && errors.destination.type==="maxLength" && <p className={styles.emptyfield}>El campo no puede exceder de 20 caracteres</p>}
                    <input placeholder="Plazas" type="number" min={1} max={6} {...register("seats", {required: true, })} />
                    {errors.seats && errors.seats.type==="required" && <p className={styles.emptyfield}>Este campo es obligatorio</p>}
                    <div className={styles.price}>
                    <input placeholder="Precio" type="number" min={1} max={1000} {...register("price", {required: true, })} />
                    <h2>€</h2>
                    </div>
                    {errors.seats && errors.seats.type==="required" && <p className={styles.emptyfield}>Este campo es obligatorio</p>}

                    <div className={styles.horarios}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="es" >
                    <Controller
                    control={control}
                    defaultValue={fechaSalida}
                    name="originDate"
                    rules={{required:true}}
                    render={
                        ({ field: { onChange, onBlur, value, ref } }) => (
                    <DatePicker
                        className={styles.textDate}
                        label="DD/MM/AAAA"
                        onChange={(e) => {onChange(e);setFechaSalida(e);}}
                        value={fechaSalida}
                        renderInput={(params) => <TextField {...params}/>} />)}/>
                   {errors.originDate && errors.originDate.type==="required" && <p className={styles.emptyfield}>Este campo es obligatorio</p>}
                   <Controller
                    control={control}
                    name="departureTime"
                    defaultValue={horaSalida}
                    rules={{required:true}}
                    render={
                        ({ field: { onChange, onBlur, value, ref } }) => (
                    <TimePicker
                        className={styles.textDate}    
                        value={horaSalida}
                        label="Salida"
                        onChange={(e) => {onChange(e);setHoraSalida(e)}}
                        selected={value}
                        renderInput={(params) => <TextField {...params}/>} />)}/>
                   
                   {errors.departureTime && errors.departureTime.type==="required" && <p className={styles.emptyfield}>Este campo es obligatorio</p>}   
                   <Controller
                    control={control}
                    name="arrivalTime"
                    defaultValue={horaLlegada}
                    rules={{required:true}}
                    render={
                        ({ field: { onChange, onBlur, value, ref } }) => (
                    <TimePicker
                        className={styles.textDate}    
                        label="Llegada"
                        value={horaLlegada}
                        rules={{required:true}}
                        onChange={(e) => {onChange(e); setHoraLlegada(e)}}
                        selected={value}
                        renderInput={(params) => <TextField {...params}/>} />)}/>
                    {errors.arrivalTime && errors.arrivalTime.type==="required" && <p className={styles.emptyfield}>Este campo es obligatorio</p>}            
                    
                    
        </LocalizationProvider>            
            
                    <Button  type='submit' bsPrefix="goTrip" className={styles.submit}>Guardar</Button>
                    </div>                  
            
        </form>
        </div>        

    )
     }
    








