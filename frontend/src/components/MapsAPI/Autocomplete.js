
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
import { Request } from '../../utils/apiWrapper';
import styles from "../newTrip/newTrip.module.css";

const AutocompleteField = ({onChange, labelName, setValue}) =>{
  const [autofillValues, setAutofillValues] = useState("")
  const [autofillOptions, setAutofillOptions] = useState([])
  

  useEffect(()=>{
    const getOptions = async (value) =>{
        if(value.length > 3) {
          const res = await Request (`/autocomplete?query=${value}`, "GET", undefined, undefined);
          setAutofillOptions([]);
          setAutofillOptions(res.addresses);
        }
        if(value.length === 0) {
            setAutofillOptions([])
            setValue(autofillValues)
        }
    }
    if (autofillValues){
        const newOptions=getOptions(autofillValues)
       
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
                        onChange={(e, values) => {
                          console.log(e);      
                          onChange(values)
                          setAutofillValues(values)}
                          }
                        onInputChange={(e, values)=>{
                            console.log(e);
                            setAutofillValues(values)}}
                    
                        renderInput={(params) => <TextField {...params} label={labelName}/>} />
  )
}

export {AutocompleteField}