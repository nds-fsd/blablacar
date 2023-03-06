const dotenv = require('dotenv');
dotenv.config()
let apikey=process.env.RADAR_API_KEY

const Radarrequest = async (route, method = "GET", body = undefined,headers={}) =>{
        let useUrl = "https://api.radar.io/v1/search" + route;
        console.log("apikey",apiKey);
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
        console.log(ops);
        const response = await fetch(useUrl,ops);
        console.log("response", response)
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
      catch(res){console.log(res);
        throw new Error(res.message)}
      }



const getAutoComplete = async (req, res, next) =>{
        let autocompleteURL=req.body.request
        try{
        const response= await Radarrequest(`/autocomplete?query=${autocompleteURL}`,"GET", undefined,undefined)
        res.body.adresses=response
        next()
        }catch{
            res.status(400).JSON(response)
        }
}

module.exports={getAutoComplete}