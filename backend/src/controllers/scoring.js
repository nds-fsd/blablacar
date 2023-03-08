const Score = require ('../mongo/schemas/scoring')
const Notification = require ('../mongo/schemas/notification')
const Trip= require ('../mongo/schemas/trip')
const dateworks=require('../utils/dateWorks')
const today = new Date();

const createAlert = async(req,res)=>{
const unnotifiedTrips=await Trip.find({scoringNotified:false}).exec()
let dueTrips=[]
for (let i =0;i<unnotifiedTrips.length;i++){
    let tripDate=new Date(unnotifiedTrips[i].originDate)
    if (dateworks.datePassed(today,tripDate)){
        dueTrips.push(unnotifiedTrips[i])
    }
}



}
module.exports={createAlert}