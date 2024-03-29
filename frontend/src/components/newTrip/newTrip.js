import React, { useState } from "react";
import { TextField } from "@mui/material";
import styles from "./newTrip.module.css";
import { Request } from "../../utils/apiWrapper";
import { getUserToken } from "../../utils/storage";
import { LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from "@mui/x-date-pickers";
import { useForm , Controller } from "react-hook-form";
import { forwardGeolocate } from "../MapsAPI/GeolocateForward";


import dayjs from "dayjs";
import 'dayjs/locale/es';
import { Button } from "react-bootstrap";
import utc from "dayjs/plugin/utc"
import timezone from "dayjs/plugin/timezone";
import { AutocompleteField } from "../MapsAPI/Autocomplete";
import { useNavigate } from "react-router-dom";
export const NewTrip = () =>{ 
    const navigate = useNavigate();
    dayjs.extend(utc)
    dayjs.extend(timezone)
    const [fechaSalida,setFechaSalida]=useState(dayjs());
    const [horaSalida,setHoraSalida]=useState(dayjs());
    const [horaLlegada,setHoraLlegada]=useState(dayjs());
    const [origin, setOrigin] = useState("");
    const [destination, setDestination] = useState("");
    const {register, control, handleSubmit,formState:{errors}} = useForm();   
    const userId = getUserToken().userObj.userID;


    
    const tripSubmit = async(data) => {
        const originCoordinates = await forwardGeolocate(data.origin);
        const destinationCoordinates = await forwardGeolocate(data.destination);

        let originLocation = {
            type : "Point",
            coordinates : originCoordinates
        }
        let destinationLocation = {
            type : "Point",
            coordinates : destinationCoordinates
        }
        const body = {
                origin: data.origin,         
                originDate: data.originDate,
                destination: data.destination,    
                departureTime: data.departureTime,
                arrivalTime:data.arrivalTime,
                seats:data.seats,
                price:data.price,
                originLocation: originLocation,
                destinationLocation: destinationLocation         
        }
        const userSession = getUserToken()
          let headers = {
            Authorization: `Bearer ${userSession.jwtToken}`,
          };
        let res = await Request ("/users/"+userId+"/newtrip","POST",body,headers);
        if(res?.error){
            alert(res.message)
        }else{
            navigate("/");
        }
    } 
    const tripError=(data)=>{
        console.log(data);
    }

    return(
        <div className={styles.parappa}>
        
        <form onSubmit={handleSubmit(tripSubmit, tripError)} className={styles.newInput}>
            <h3 className={styles.newUserTitle}>Crea tu viaje</h3>
                <Controller
                        control={control}
                        defaultValue={origin}
                        name="origin"
                        rules={{required:true}}
                        render={
                            ({ field: { onChange, onBlur, value, ref } }) => (
                        <AutocompleteField onChange={onChange} labelName={"Origen"} setValue={setOrigin}/>)}/>
                    {errors.origin && errors.origin.type==="required" && <p className={styles.emptyfield}>Este campo es obligatorio</p>}
            
                    {/* <input placeholder="Origen" className={styles.textbox}{...(register("origin", {required:true,minLength:3,maxLength:20}))}/>
                    {errors.origin && errors.origin.type==="required" && <p className={styles.emptyfield}>Este campo es obligatorio</p>}
                    {errors.origin && errors.origin.type==="minLength" && <p className={styles.emptyfield}>El mínimo  número de caracteres es 3</p>}
                    {errors.origin && errors.origin.type==="maxLength" && <p className={styles.emptyfield}>El campo no puede exceder de 20 caracteres</p>} */}
                <Controller
                    control={control}
                    defaultValue={"Destino"}
                    name="destination"
                    rules={{required:true}}
                    render={
                        ({ field: { onChange, onBlur, value, ref } }) => (
                    <AutocompleteField onChange={onChange} labelName={"Destino"}/>)}/>
                   {errors.destination && errors.destination.type==="required" && <p className={styles.emptyfield}>Este campo es obligatorio</p>}
                    {/* <input placeholder="Destino" className={styles.textbox}{...(register("destination", {required:true,minLength:3,maxLength:20}))}/>
                    {errors.destination && errors.destination.type==="minLength" && <p className={styles.emptyfield}>El mínimo  número de caracteres es 3</p>}
                    {errors.destination && errors.destination.type==="required" && <p className={styles.emptyfield}>Este campo es obligatorio</p>}
                    {errors.destination && errors.destination.type==="maxLength" && <p className={styles.emptyfield}>El campo no puede exceder de 20 caracteres</p>} */}
                    <input placeholder="Plazas" type="number" min={1} max={6} {...register("seats", {required: true, })} />
                    {errors.seats && errors.seats.type==="required" && <p className={styles.emptyfield}>Este campo es obligatorio</p>}
                    <div className={styles.price}>
                    <input placeholder="Precio" type="number" min={1} max={1000} {...register("price", {required: true, })} />
                    <h2>€</h2>
                    </div>
                    {errors.price && errors.price.type==="required" && <p className={styles.emptyfield}>Este campo es obligatorio</p>}
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
    








