import React, {useState} from "react";
import "./newUser.css";

export const NewUser = () => {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [dateOfBirth, setDateOfBirth] = useState("");
    const [treatment, setTreatment] = useState("");
    const [password, setPassword] = useState("");

    const handleName = (event) => {
        setName(event.target.value);
    }

    const handleSurname = (event) => {
        setSurname(event.target.value);
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handleDateOfBirth = (event) => {
        setDateOfBirth(event.target.value);
    }

    const handleTreatment = (event) => {
        setTreatment(event.target.value);
    }

    const handlePassword = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = () => {
        const url = "http://localhost:3001/users";
        const body = {
            name,
            surname,
            email,
            dateOfBirth,
            treatment,
            password
        }
        const options = {
            method: "POST",
            mode: "no-cors",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(body),
        };
        fetch(url, options)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
        });
    };
    
    return(
        <div className="newInput">
            <h3 className="newUserTitle">Crea tu cuenta</h3>
            <label for="name" className="textbox">
                <input
                    required
                    type="text"
                    value={name}
                    placeholder="Nombre"
                    onChange={handleName}
                />
            </label>
            <br />
            <label for="surname" className="textbox">
                <input 
                    required
                    type="text"
                    value={surname}
                    placeholder="Apellido"
                    onChange={handleSurname}
                />
            </label>
            <br />
            <label for="email" className="textbox">
                <input 
                    required
                    type="email"
                    value={email}
                    placeholder="Email"
                    onChange={handleEmail}
                />
            </label>
            <br />
            <label for="dateOfBirth" className="textbox">
                <input
                    required
                    type="date"
                    value={dateOfBirth}
                    placeholder="DD/MM/YYYY"
                    onChange={handleDateOfBirth}
                />
            </label>
            <br />
            <label for="treatment" className="textbox">
                <select required id="treatment" name="treatment" onChange={handleTreatment}>
                    <option value="">Tratamiento</option>
                    <option value="Sra.">Sra.</option>
                    <option value="Sr.">Sr.</option>
                    <option value="Srta.">Srta.</option>
                    <option value="NotSay">Prefiero no decirlo</option>
                </select>
            </label>
            <br />
            <label for="password" className="textbox">
                <input 
                    required
                    type="password"
                    value={password}
                    placeholder="Contraseña"
                    onChange={handlePassword}
                />
            </label>
            <button onClick={handleSubmit}>Registrar</button>
        </div>
    )
}

