const createAddress=(address)=>{
    let showAddress
    if (address.layer==="locality"){
        if (!address.city||!address.state||!address.countryCode){
            return undefined
        }
    showAddress=`${address.city}, ${address.state}, ${address.countryCode}`
    }else if(address.layer==="street"){
        if (!address.street||!address.city||!address.countryCode){
            return undefined
        }
    showAddress=`${address.street}, ${address.city}, ${address.countryCode}`
    }else if (address.layer==="address"){
        if(!address.street||!address.number||!address.postalCode||!address.city||!address.state||!address.countryCode){
            return undefined
        }
    showAddress=`${address.street} ${address.number}, ${address.postalCode} ${address.city}, ${address.state} ${address.countryCode}`
    }else if(address.layer==="place"){
    showAddress=`${address.placeLabel}, ${address.formattedAddress}`
    }
    return(showAddress)
}

module.exports={createAddress}