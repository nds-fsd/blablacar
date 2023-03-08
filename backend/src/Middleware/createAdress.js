const createAddress=(address)=>{
    let showAddress
    if (address.layer==="locality"){
    showAddress=`${address.city}, ${address.state}, ${address.countryCode}`
    }else if(address.layer==="street"){
    showAddress=`${address.street}, ${address.city}, ${address.countryCode}`
    }else if (address.layer==="address"){
    showAddress=`${address.street} ${address.number}, ${address.postalCode} ${address.city}, ${address.state} ${address.countryCode}`
    }
    return(showAddress)
}

module.exports={createAddress}