import styles from "./login.module.css";
import React, {useState} from "react";
import { Link } from "react-router-dom";


 export const Login = () =>{
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const handleName = (event) => {
        setName(event.target.value);
    }
    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    return(
        <div className={styles.main}>
            <div className={styles.formMain}>
                <div className = {styles.formLogin}>
                    <h3 className={styles.loginTitle}>Login</h3>
                    <div>
                        <label for="name">
                            <input
                                required
                                type="text"
                                value={name}    
                                placeholder="Nombre"
                                onChange={handleName}
                             />
                         </label>
                         <label for="password">
                            <input
                                required
                                type="password"
                                value={password}
                                placeholder="password"
                                onChange={handlePassword}
                             />
                         </label>
                    <div className={styles.bttnLogin}>
                        <button>Log in</button>
                        <Link to="/users">recuperar contraseña</Link>
                    </div>
                    <div className={styles.signup}>
                        <Link to="/users">Sign up</Link>
                    </div>
                    </div>
                </div>
            </div>
            <div className={styles.imgMain}>
            </div>
        </div>
    )

}
