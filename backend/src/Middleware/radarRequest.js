const dotenv = require ('dotenv')
dotenv.config()
const apiKey = process.env.RADAR_API_KEY


const Radarrequest = async (route, method = "GET", body = undefined,headers={}) =>{
    let useUrl = "https://api.radar.io/v1/" + route;
    let ops = {
      method: method,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Authorization" : apiKey,
        ...headers,
        }
    }
    if(body){
      ops.body = JSON.stringify(body)
    }
  try{
    const response = await fetch(useUrl,ops);
    let json = await response.json()
      if (response.ok){
        return json
      } else {
  
        return {
              error:true, 
              message: json.message,
              status: response.status
            }}
    }
    //TODO:ver qué error devolvemos en backend para esto
  catch(res){
    throw new Error(res.message)}
  }

  module.exports={Radarrequest}