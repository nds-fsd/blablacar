const sendAutoComplete = (req, res) =>{
    //let adresses=[]
    req.body.adresses.map((e)=>{
        console.log(e);
    })
    res.status(200)


}

module.exports={sendAutoComplete};
