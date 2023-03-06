const API_URL = 
window.location.hostname === "pimpambug.netlify.app"
?'https://pimpambuga.up.railway.app/'
:"http://localhost:3001";

const Request = async (route, method = "GET", body = undefined,headers={}) =>{
 
    let useUrl = API_URL + route;
    let ops = {
      method: method,
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...headers,
        }
    }
    if(body){
      ops.body = JSON.stringify(body)
    }
  try{
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


const Radarrequest = async (route, method = "GET", body = undefined,headers={}) =>{
  const apiKey = process.env.REACT_APP_API_KEY;
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

  export {Request, Radarrequest}