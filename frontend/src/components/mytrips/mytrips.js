import { useEffect, useState } from "react";
import { Request } from "../../utils/apiWrapper";
import { getStorageObject} from "../../utils/storage";
import TripSummary from "../TripSummary/TripSummary";
import styles from "./mytrips.module.css";

 export const Mytrips  = (props) =>{
    const [mytrips,setMytrips] = useState("")
    const userSession=getStorageObject('user-session')
    const userId = userSession.userObj.userID
    useEffect(()=>{
        const getMyTrips = async() =>
        {
            
            let headers = {
                Authorization: `Bearer ${userSession.jwtToken}`,
              };
            const response = await Request(`/users/${userId}`,"GET","",headers)
            console.log(response);
            setMytrips(response);
            
        }
        if(!mytrips){
        getMyTrips()}
        
    },[])


    return(
       
        <div className={styles.container}>
            <div className={styles.half}> <h1>Mis viajes</h1>
                {mytrips && mytrips.idTrips.map((e)=>(
                    <TripSummary location="profile" id={e._id}  showSeats={false} showBookings={e.bookings} trip={e} key={e._id} setWhatModal={props.setWhatModal} setOpenModal={props.setOpenModal}/>))} 
            </div>
            <div className={styles.half}> <h1>Mis reservas</h1>
          {mytrips && mytrips.bookedTrips.map((t)=>(
            <TripSummary location="profile" id={t.bookedTrip._id} showSeats={false} trip={t.bookedTrip} setWhatModal={props.setWhatModal} setOpenModal={props.setOpenModal} key={t._id}/>
            ))} 
            </div>
        </div>
        

    )

 }



