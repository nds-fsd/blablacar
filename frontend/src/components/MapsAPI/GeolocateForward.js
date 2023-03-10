import { Radarrequest } from "../../utils/apiWrapper";

export const forwardGeolocate = async (address) =>{
    
        //TRADUCIR DIRECCION A CORDENADAS______________________________________

        const tripOrigin = address.split(" ");

        let formattedAddress = "";

        tripOrigin.map((e)=>{
            formattedAddress = formattedAddress + "+" + e;}
            );
        let queryParams = formattedAddress.replaceAll(",","").substring(1);
        let geocode = await Radarrequest(`geocode/forward?query=${queryParams}`, "GET", undefined, undefined);
        if(geocode?.error){
            alert(geocode.message);
            return undefined
        }else{
            const coordinates = geocode.addresses[0].geometry.coordinates;
            return coordinates;
        }
}