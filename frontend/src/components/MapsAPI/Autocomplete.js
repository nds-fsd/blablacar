
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
import useDebounce from '../../utils/debounce'
const apiKey = import.meta?.env?.RADAR_API_KEY;
const mapApiSearch = "https://api.radar.io/v1/search/autocomplete";


const Autofill = () =>{
  // const [options, setOptions] = useState([])
  // const [searchValue, setSearchValue] = useState("")
  // setOptions(["Barcelona", "Madrid", "Albacete", "CagayVete"])

  const options = ["Barcelona", "Madrid", "Albacete", "CagayVete"]

  return(
    <Autocomplete
      filterOptions={(x) => x} 
      options={options}
      renderInput={(params) => <TextField {...params} label="Origen"/>}
      fullwidth={true}
      sx={{width: 385}}
      />
  )
}

export {Autofill}