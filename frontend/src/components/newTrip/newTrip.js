import { getStorageObject } from "../../utils/storage";
import { useState } from "react";
import styles from "./newTrip.module.css";
import { Request } from "../../utils/apiWrapper";
import { AddressAutofill } from "@mapbox/search-js-react";

console.log(localStorage.getItem("usr.Obj"))

export const NewTrip = () => {
    const [origin, SetOrigin] = useState("");
    const [originAddress, SetOriginAddress] = useState("");
    const [originDate, SetOriginDate] = useState("");
    const [destination, SetDestination] = useState("");
    const [destinationAddress, SetDestinationAddress] = useState("");
    const [destinationDate, SetDestinationDate] = useState("");
    const [seats, SetSeats] = useState("");
    const [price, SetPrice] = useState("");
  
    const handleOrigin = (event) => {
      SetOrigin(event.target.value);
    };
    const handleOriginAddress = (event) => {
      SetOriginAddress(event.target.value);
    };
    const handleOriginDate = (event) => {
      SetOriginDate(event.target.value);
    };
    const handleDestination = (event) => {
      SetDestination(event.target.value);
    };
    const handleDestinationAddress = (event) => {
      SetDestinationAddress(event.target.value);
    };
    const handleDestinationDate = (event) => {
      SetDestinationDate(event.target.value);
    };
    const handleSeats = (event) => {
      SetSeats(event.target.value);
    };
    const handlePrice = (event) => {
      SetPrice(event.target.value);
    };
    const handleSubmit = async() => {
        const sessiontoken = getStorageObject("user-session")
        const jwt = sessiontoken.jwtToken
        const userID = sessiontoken.userObj.userID
        const body = {
            origin,
            originAddress,
            originDate,
            destination,
            destinationAddress,
            destinationDate,
            seats,
            price,
          };
        const getJWT = () => {
            console.log("this is " +jwt);
            return jwt;
          };
          let headers = {
            Authorization: `Bearer ${getJWT()}`,
          };
        let res = await Request (`/users/${userID}/newtrip`,"POST",body)
        if(res?.error){
            alert(res.message)
          }else{
            alert(`viaje creado con destino a ${body.origin}`)
          }
        

    } 
    return (
        <div className={styles.main}>
          <div className={styles.formTrip}>
            <h3>Crear Viaje</h3>
            <form>
              <AddressAutofill
                options={{
                  language: "es",
                  country: "ES",
                }}
                accessToken = {process.env.REACT_APP_MAPBOX_API}
              >
                <label for="Origin" className={styles.textbox}>
                  <input 
                    required
                    type="text"
                    value={origin}
                    placeholder="Origen"
                    autoComplete="address-level2"
                    onChange={handleOrigin}
                  />
                </label>
                </AddressAutofill>
                <label for="OriginAddress" className={styles.textbox}>
                  <input className={styles.gray}
                    required
                    type="text"
                    value={originAddress}
                    placeholder="Ciudad"
                    autoComplete="address-level2"
                    onChange={handleOriginAddress}
                    readOnly 
                  />
                
                </label>
              
              <label for="OriginDate" className={styles.textbox}>
                <input
                  require
                  type="date"
                  value={originDate}
                  placeholder="DD/MM/YYYY"
                  min={new Date().toISOString().split('T')[0]}
                  onChange={handleOriginDate}
                />
              </label>
              <AddressAutofill
               options={{
                language: "es",
                country: "ES",
                types: "place"
              }}
              accessToken = {process.env.REACT_APP_MAPBOX_API}
            >
              <label for="Destination" className={styles.textbox}>
                <input
                  required
                  type="text"
                  value={destination}
                  placeholder="Destination"
                  //autocomplete="address-level2"
                  onChange={handleDestination}
                />
              </label>
              <label for="DestinationAddress" className={styles.textbox}>
                  <input className={styles.gray}
                    required
                    type="text"
                    value={destinationAddress}
                    placeholder="Ciudad"
                    autoComplete="address-level2"
                    onChange={handleDestinationAddress}
                    readOnly 
                  />
                
                </label>
              </AddressAutofill>
              <label for="DestinationDate" className={styles.textbox}>
                <input
                  required
                  type="date"
                  value={destinationDate}
                  placeholder="DD/MM/YYYY"
                  min={originDate}
                  onChange={handleDestinationDate}
                />
              </label>
              <label for="Seats" className={styles.textbox}>
                <input
                  required
                  type="number"
                  value={seats}
                  placeholder="seats"
                  min="1" 
                  max="9"
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
            </form>
            <button onClick={handleSubmit}>Crear viaje</button>
          </div>
        </div>
      );
}