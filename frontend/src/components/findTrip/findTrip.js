import styles from "./findTrip.module.css";
import { useLocation } from "react-router-dom";
import {useState } from "react";
import { Request } from "../../utils/apiWrapper";
import {Trip} from "../trip/trip"
import TripSummary from "../TripSummary/TripSummary";
import TripExtended from "../TripExtended/TripExtended";
import { getStorageObject } from "../../utils/storage";


const FindTrip = () => {
    const location=useLocation()
    const trips = location.state
    // const [tripsFind,setTripsFind] =useState([])
    // const [reload,setReload] = useState(false)
    // const [openModal,setModal] = useState(false);
    // const reloadPage = () =>{
    //     setReload(!reload)
    // }

    // const updateModal = () =>{
    //     setModal(!reload)
    // }

    // const apiFilter = async () =>{
    //         const api1 = await Request(`${location.pathname}`)
    //         setTripsFind(api1)
    //         console.log(tripsFind)
    // }
    // const apiList = async () =>{
    //     const api1 = await Request(`/trips`)
    //     setTripsFind(api1)
    //     console.log(tripsFind)
    // }
       
//    useEffect(() => {
//     if(location.pathname  === "/trips/list"){
//         apiList();
//     }else{
//         apiFilter()   
//     }

 

//    },[reload])


    // const deleteTrip = async (id) =>{
    //     let res = await Request("/trips/"+id,"delete")
    //                 if(res?.error){
    //                     alert(res.message)
    //                 }else{
    //                   alert("viaje eliminado con exito")
    //                   reloadPage();
    //                 }                  
    // }

    // const updateTrip = (id) =>{
    //     console.log(id)
    //     setModal(!openModal)
    //     reloadPage();
    // })
    return(
        <div className={styles.parappa}>
          {trips&&trips.map((e)=>(
            <TripSummary trip={e} id={e._id} />))} 

        </div>
    )
}

export {FindTrip}