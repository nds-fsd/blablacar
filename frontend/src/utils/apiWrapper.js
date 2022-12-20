const request= async (route, method, body={},headers={}) =>{
    let useUrl = "http://localhost:3001/" + route;
    let ops = {
      method: method,
      mode: "cors",
      body:JSON.stringify(body),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        ...headers,
        }
    }
  try{
    console.log(useUrl);
    console.log(ops);
    const response = await fetch(useUrl, ops);
    if (response.status >= 200 && response.status < 300){
      return response
    }else{return Promise.reject()}
    }
    //TODO:ver qué error devolvemos en backend para esto
  catch(res){throw new Error(res.error)}
}
  export {request}
  