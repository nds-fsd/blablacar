import styles from "./findTrip.module.css";
import { useLocation } from "react-router-dom";
import {useState } from "react";
import { Request } from "../../utils/apiWrapper";
import {Trip} from "../trip/trip"


const FindTrip = () => {
    const location=useLocation()
    const trips = location.state
    console.log("findtrip",trips)
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
       
//    useEffect(() => {
//     if(location.pathname  === "/trips/list"){
//         apiList();
//     }else{
//         apiFilter()   
//     }

 

//    },[reload])


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
        <Trip deleteTrip ={deleteTrip} tripsFind ={trips} updateTrip = {updateTrip} openModal = {openModal} />
    )
}

export {FindTrip}