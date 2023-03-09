const API_URL = 
window.location.hostname === 'pimpambuga.netlify.app'
?'https://pimpambuga.up.railway.app'
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
    console.log("header", ops);
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


const Radarrequest = async (route, method = "GET", body = undefined,headers={}) =>{
  const apiKey = process.env.REACT_APP_API_KEY;
  let useUrl = "https://api.radar.io/v1/" + route;
  let ops = {
    method: method,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Authorization" : "prj_test_pk_0583e8ab4b18eacb42f5567b721867632cf51b8d",
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

export {Request, Radarrequest}