const Request = async (route, method = "GET", body = undefined,headers={}) =>{
 
    let useUrl = "http://localhost:3001/" + route;
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
    console.log(useUrl);
    console.log(ops);
    const response = await fetch(useUrl,ops);
    let json = await response.json()
      if (response.ok){
        return json
      } else {
        if(response.status === 404 ){
          
        }
        return {
              error:true, 
              message: json.message,
              status: response.status
            }}
    }
    //TODO:ver qué error devolvemos en backend para esto
  catch(res){console.log(res);
    throw new Error(res.error)}
}
const changeToShortDate = (date) =>{
  const year = date.substring(0,4)
  const month = date.substring(4,8)
  const day = date.substring(8,10)
  return day+month+year
}
  export {Request,changeToShortDate}
  