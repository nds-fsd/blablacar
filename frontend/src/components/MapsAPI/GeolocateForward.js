import { Radarrequest } from "../../utils/apiWrapper";

export const forwardGeolocate = async (address) =>{
    
        //TRADUCIR DIRECCION A CORDENADAS______________________________________

        const tripOrigin = address.split(" ");
        console.log("tripOrigin", tripOrigin);

        let formattedAddress = "";

        tripOrigin.map((e)=>{
            formattedAddress = formattedAddress + "+" + e;
            console.log(formattedAddress);
        });
        let queryParams = formattedAddress.replaceAll(",","").substring(1);
        let geocode = await Radarrequest(`geocode/forward?query=${queryParams}`, "GET", undefined, undefined);
        if(geocode?.error){
            alert(geocode.message);
        }else{
            console.log("coordinates",geocode.addresses[0].geometry.coordinates);
            const coordinates = geocode.addresses[0].geometry.coordinates;
            return coordinates;
        }
}