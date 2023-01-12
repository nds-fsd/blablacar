const changeToShortDate = (date) =>{
    const year = date.substring(0,4)
    const month = date.substring(4,8)
    const day = date.substring(8,10)
    return day+month+year
  }
  export{changeToShortDate}