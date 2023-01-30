
import React, {useContext, useState} from "react";
import { Link,useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import ConfigIcon from "../IconConfig/iconsize_small";
import { AiOutlineEye} from "react-icons/ai"
import { Request } from "../../utils/apiWrapper";
import { AuthContext } from "../../context/AuthContext";
import { setStorageObject } from "../../utils/storage";

 export const Login = (props) =>{
    const { token, saveToken}=useContext(AuthContext)
    const navigate = useNavigate();
    const { register, handleSubmit,formState: { errors }} = useForm();
    const [passview,setPassview]=useState(false)
    const changePassview=()=>{
        setPassview(!passview)
    }
    const isValidEmail = (email) =>{  
        console.log(email);
         // eslint-disable-next-line
        let checkEmail=/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)
        console.log(checkEmail);
        return checkEmail
    };
    const isValidPassword = (passw) =>{  
        console.log(passw);
         // eslint-disable-next-line
        let checkPassw=/^(?=.*([A-Z]){1,})(?=.*[!@#$&*]{1,})(?=.*[0-9]{1,})(?=.*[a-z]{1,}).{3,100}$/.test(passw)
        console.log(checkPassw);
        return checkPassw
    }


    const LoginSubmit=async(data)=>{
                 const body = {
                                email:data.email,
                                password:data.password
                            }

                            const getJWT = () => {
                                return localStorage.getItem("jwtToken");
                              };
                              let headers = {
                                Authorization: `Bearer ${getJWT()}`,
                              };
                        let res = await Request("/auth/login","POST",body, { headers })
        
                        if(res?.error){
                            alert(res.message)
                        }else{
                          if (res.jwtToken){
                            console.log(res);
                            setStorageObject("user-session",res);    
                            saveToken(res.jwtToken)
                            console.log(res.jwtToken);
                            console.log(token);
                            navigate("/")
                            }  
                         
                          
                  
        }       
    }
    return(
    <div className= "h-screen bg-carretera bg-contain bg-no-repeat bg-[length:100%_100%]">
        <div className="h-screen flex items-center justify-center lg:h-screen flex items-center ml-7">
        <form onSubmit={handleSubmit(LoginSubmit)} className="shadow-lg border-solid border-black bg-white flex flex-col flex items-center justify-center h-80 w-1/4 rounded-2xl bg-cover">
        <h3 className="mt-2" onClick={LoginSubmit}>Login</h3>
            <input {...register("email", {required: true,validate:{invalid: v=> isValidEmail(v)===true}})} placeholder="Email" className="w-9/12 flex  items-center justify-center"/>
            {errors.email && errors.email.type==="invalid" && "Email no válido"}
            {errors.email?.type === "required" && "Email es obligatorio"}
            <div className="w-full flex  items-center justify-center w-9/12">
            <input {...register("password", {required: true,validate:{invalid: v=> isValidPassword(v)===true} })} placeholder="password"  className="w-9/12 ml-8 flex  items-center justify-center  " type={passview?"text":"password"}/>
            <ConfigIcon><AiOutlineEye className="ml-2" onClick={changePassview}/></ConfigIcon>
            </div>
            {errors.password && errors.password.type==="invalid" && "Password debe contener 1 mayúscula, 1 dígito y un carácter especial"}
            {errors.password?.type === "required" && "la password es obligatoria"}
            <div className="w-full flex justify-end w-1/4 mb-4 mr-12">
                        <Link to="/users">Registrarse</Link>
            </div>
            <input type="submit" className="w-1/4 bg-orange text-white hover:bg-orangeHover" />
            <div className="flex items-center justify-center">
                        <Link to="/users">¿Olvidaste tu contraseña?</Link>
            </div>
        </form>
        </div>
    </div>  
    )

}
