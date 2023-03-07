
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
import { useDebounce  } from './Debounce';

const AutocompleteField = ({onChange, labelName, setValue}) =>{
  const [autofillValues, setAutofillValues] = useState("")
  const [autofillOptions, setAutofillOptions] = useState([])
  const debouncedSearchTerm = useDebounce(autofillValues, 400);

  useEffect(()=>{
    if(debouncedSearchTerm){
    const getOptions = async (value) =>{
        console.log(value)
        if(value.length > 3) {
          const res = await Request (`/autocomplete?query=${value}`, "GET", undefined, undefined);
          console.log(res);
          setAutofillOptions([]);
          setAutofillOptions(res.addresses);
          console.log("ResOptions",res.addresses)}
        if(value.length === 0) {
            setAutofillOptions([])
            setValue(autofillValues)
        }
    }
    if (autofillValues){
        const newOptions=getOptions(autofillValues)
        console.log(newOptions);
    }}
},[debouncedSearchTerm])
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