
/*
RADAR API
- CUANDO CREAS VIAJE
  1. Autocomplete (GET MIENTRAS RELLENAS CAMPO).
  2. Fordward Geocode (GET Traduce direccion a coordenadas).
  3. Guardar viaje en BD. (Post newTrip).

- CUANDO BUSCAS UN VIAJE
  1. Autocomplete (GET MIENTRAS RELLENAS CAMPO).
  2. Fordward Geocode (GET Traduce direccion a coordenadas).
  3. Search Places?
*/
import {useState, useEffect} from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { Radarrequest } from '../../utils/apiWrapper';
import styles from "../newTrip/newTrip.module.css";

const AutocompleteField = ({onChange, labelName, setValue}) =>{
  const [autofillValues, setAutofillValues] = useState("")
  const [autofillOptions, setAutofillOptions] = useState([])
  

  useEffect(()=>{
    const getOptions = async (value) =>{
        console.log(value)
        if(value.length > 3) {
          
          const res = await Radarrequest (`/autocomplete?query=${value}`, "GET", undefined, undefined);
          console.log(res);
          let optionsResults = []
          res.addresses.map((e)=>{
              optionsResults.push(e.formattedAddress)
          })
          setAutofillOptions([]);
          setAutofillOptions(optionsResults);
          console.log("ResOptions", optionsResults)}
        if(value.length === 0) {
            setAutofillOptions([])
            setValue(autofillValues)
        }
    }
    if (autofillValues){
        const newOptions=getOptions(autofillValues)
        console.log(newOptions);
    }
},[autofillValues])
  return(
    <Autocomplete
                        disableClearable
                        disableCloseOnSelect
                        freeSolo
                        getOptionLabel={(option) => `${option}`}
                        filterOptions={(x) => x}
                        options = {autofillOptions}
                        className={styles.textbox}
                        autoComplete
                        includeInputInList
                        filterSelectedOptions
                        value={autofillValues || null}
                        noOptionsText="No locations"
                        onChange={(e) => {
                          console.log(e);      
                          onChange(e.target.value)
                          setAutofillValues(e.target.value)}
                          }
                        onInputChange={(e)=>{
                            console.log(e);
                            setAutofillValues(e?.target?.value)}}
                    
                        renderInput={(params) => <TextField {...params} label={labelName}/>} />
  )
}

export {AutocompleteField}