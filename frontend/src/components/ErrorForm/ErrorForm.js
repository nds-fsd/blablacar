import styles from "./ErrorForm.module.css";
import { Link } from "react-router-dom";
export const ErrorForm =()=>{
return (
    <div className={styles.ErrorForm}>
        <h2>Ups! Has viajado a una página <br/>que no existe!</h2>
        <p>Click <Link to="/">aqui</Link> para volver</p>

    </div>
)
}

