import { useState } from "react";
import styles from "./newTrip.module.css";
import { Request } from "../../utils/apiWrapper";

export const NewTrip = () =>{
    const [origin,SetOrigin] =useState("");
    const [originDate,SetOriginDate] =useState("");
    const [destination,SetDestination] =useState("");
    const [destinationDate,SetDestinationDate] =useState("");
    const [seats,SetSeats] =useState("");
    const [price,SetPrice] =useState("");
    
    const handleOrigin = (event) =>{
        SetOrigin(event.target.value)
    }
    const handleOriginDate = (event) =>{
        SetOriginDate(event.target.value)
    }
    const handleDestination = (event) =>{
        SetDestination(event.target.value)
    }
    const handleDestinationDate = (event) =>{
        SetDestinationDate(event.target.value)
    }
    const handleSeats = (event) =>{
        SetSeats(event.target.value)
    }
    const handlePrice = (event) =>{
        SetPrice(event.target.value)
    }
    const handleSubmit = async() => {
        const body = {
                    origin,
                    originDate,
                    destination,
                    destinationDate,
                    seats,
                    price
        }
        let res = await Request ("trips","POST",body)
        if(res?.error){
            alert(res.message)
          }else{
            alert(`viaje creado con destino a ${body.origin}`)
          }
        

    } 
    return(
        <div className={styles.main}>
            <div className={styles.formTrip}>
                <h3>Crear Viaje</h3>
                <label for="Origin" className={styles.textbox}>
                <input
                    required
                    type="text"
                    value={origin}
                    placeholder="Origen"
                    onChange={handleOrigin}
                />
                </label>
                <label for="OriginDate" className={styles.textbox}>
                <input
                    required
                    type="date"
                    value={originDate}
                    placeholder="DD/MM/YYYY"
                    onChange={handleOriginDate}
                />
                </label>
                <label for="Destination" className={styles.textbox}>
                <input
                    required
                    type="text"
                    value={destination}
                    placeholder="Destination"
                    onChange={handleDestination}
                />
                </label>
                <label for="DestinationDate" className={styles.textbox}>
                <input
                    required
                    type="date"
                    value={destinationDate}
                    placeholder="DD/MM/YYYY"
                    onChange={handleDestinationDate}
                />
                </label>
                <label for="Seats" className={styles.textbox}>
                <input
                    required
                    type="number"
                    value={seats}
                    placeholder="seats"
                    onChange={handleSeats}
                />
                </label>
                <label for="Price" className={styles.textbox}>
                <input
                    required
                    type="number"
                    value={price}
                    placeholder="Price"
                    onChange={handlePrice}
                />
                </label>
                <button onClick={handleSubmit}>enviar</button>
            </div>
        </div>
    );
}