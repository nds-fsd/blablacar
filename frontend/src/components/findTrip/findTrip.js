import { useLocation } from "react-router-dom";
import styles from "./finTrip.module.css";
import {changeToShortDate} from "../../utils/apiWrapper"
import userLogo from "../assets/user.png"
import {useState,useEffect } from "react";
import { Request } from "../../utils/apiWrapper";
import {Trip} from "../trip/trip"


const FindTrip = () => {
    const location = useLocation();
    console.log(location)
    const [tripsFind,setTripsFind] =useState([])
    const [reload,setReload] = useState(false)
    const [openModal,setModal] = useState(false);
    const reloadPage = () =>{
        setReload(!reload)
    }

    const updateModal = () =>{
        setModal(!reload)
    }

    const apiFilter = async () =>{
            const api1 = await Request(`${location.pathname}`)
            setTripsFind(api1)
            console.log(tripsFind)
    }
    const apiList = async () =>{
        const api1 = await Request(`/trips`)
        setTripsFind(api1)
        console.log(tripsFind)
    }
       
   useEffect(() => {
    if(location.pathname  === "/trips/list"){
        apiList();
    }else{
        apiFilter()   
    }

 

   },[reload])


    const deleteTrip = async (id) =>{
        let res = await Request("/trips/"+id,"delete")
                    if(res?.error){
                        alert(res.message)
                    }else{
                      alert("viaje eliminado con exito")
                      reloadPage();
                    }                  
    }

    const updateTrip = (id) =>{
        console.log(id)
        setModal(!openModal)
        reloadPage();
    }
    return(
        <Trip deleteTrip ={deleteTrip} tripsFind ={tripsFind} updateTrip = {updateTrip} openModal = {openModal} />
    )
}

export {FindTrip}