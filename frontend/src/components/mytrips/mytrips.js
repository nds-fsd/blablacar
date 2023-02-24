import { useEffect, useState } from "react";
import { Request } from "../../utils/apiWrapper";
import { getUserToken } from "../../utils/storage";
import TripSummary from "../TripSummary/TripSummary";
import styles from "./mytrips.module.css";

 export const Mytrips  = () =>{
    const [mytrips,setMytrips] = useState("")
    const userId = getUserToken().userObj.userID
    useEffect(()=>{
        const getMyTrips = async() =>
        {
            
            let headers = {
                Authorization: `Bearer ${userSession.jwtToken}`,
              };
            const response = await Request(`/users/${userId}`,"GET","",headers)
            setMytrips(response);
            console.log(mytrips);
        }
        getMyTrips()
        
    },[])


    return(
       
        <div>
            <div> <h1>Mis viajes</h1>
                {mytrips && mytrips.idTrips.map((e)=>(
                    <TripSummary showAvatar={false} showSeats={false} showBookings={e.bookings} trip={e} id={e._id} />))} 
            </div>
            <div> <h1>Mis reservas</h1>
          {mytrips && mytrips.bookedTrips.map((t)=>(
            <TripSummary TripSummary  trip={t.bookedTrip} id={t._id}/>
            ))} 
            </div>
        </div>
        

    )

 }



