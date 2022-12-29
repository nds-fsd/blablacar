const request= async (route, method = "GET", body = undefined,headers={}) =>{
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
        console.log("responseOk",response)
        return json
      } else {
        return {
              error:true,
              message: json.message
      }}
    }
    //TODO:ver qué error devolvemos en backend para esto
  catch(res){console.log(res);
    throw new Error(res.error)}
}
  export {request}
  