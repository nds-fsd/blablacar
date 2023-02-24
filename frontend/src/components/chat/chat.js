import { useEffect, useState } from "react"
import {useForm} from "react-hook-form"
import styles from "./chat.module.css";
const Chat = ({socket, userName, token, room}) => {
    const [messages, setMessages] = useState('')
    // solo tiene que ejecutarse una vez el efecto

    useEffect(() =>{
        const recieveMessage = (data) => {
            setMessages([...messages, data.content])

        }
        socket.on('reply', recieveMessage)
        return () => {
            socket.off('reply', recieveMessage)
        }
    },[messages])

    console.log(`estos son los mensajes ${messages}`)

    console.log('este es el token que nos traemos como prop ', token)
    const Socket = socket
    const name = userName
    const {register, handleSubmit} = useForm() 

const onSubmit = (data) => {
    console.log(data)
    Socket.emit('message', {message: data.message, user: name , token: token, room : room})
}

  return (
    <div className={styles.chatContainer}>
        <div className={styles.textContainer}>
            Conversacion 
        </div>
    <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
        <input {...register("message")}/>
        <input type="submit"/>  
    </form>
    </div>
  )
}

export  {Chat};