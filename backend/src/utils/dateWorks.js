
const diaSemana=(date)=>{
    let fecha=new Date(date);
    const dia = ["Lunes","Martes","Miércoles","Jueves","Viernes","Sábado","Domingo"];
    return dia[fecha.getDay()]
}

const mesFecha=(date)=>{
    let fecha=new Date(date)
    const mes = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
    return mes[fecha.getMonth()]

}

const fechaHora=(date)=>{
    let fecha=new Date(date)
    let hora=fecha.getHours()
    if (hora.length===1){
        hora="0"+hora
    }
    let minuto=fecha.getMinutes()
    if (minuto.length===1){
        minuto="0"+minuto
    }
    
    return `${hora}:${minuto}`
    
}
const datePassed = (today,tripDate)=>{
let past=false;


}

module.exports = {fechaHora , diaSemana , mesFecha , datePassed}