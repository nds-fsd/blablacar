const Radarrequest=require('../Middleware/radarRequest')
const createAddress=require('../Middleware/createAdress')

const sendAutoComplete = async (req, res) => {
const params = req.query.query;
console.log(params);
const data = await Radarrequest.Radarrequest(`search/autocomplete?query=${params}`);
console.log(data);
let addresses=[]
let showAddress=""
data.addresses.map((e)=>{
   if ((e.layer==="locality"||e.layer==="street"||e.layer==="address")&&e.country==='Spain'){
showAddress = createAddress.createAddress(e)}
if (showAddress&&addresses.indexOf(showAddress)===-1){
   addresses.push(showAddress)
}
})
   res.status(200).json({"addresses":addresses})
}    



module.exports={sendAutoComplete}