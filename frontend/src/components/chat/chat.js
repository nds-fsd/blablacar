import { useEffect, useState, useRef } from "react"
import {useForm} from "react-hook-form"
import styles from "./chat.module.css";
import { getUserToken } from "../../utils/storage";
import { GoX } from "react-icons/go";
import { Request } from "../../utils/apiWrapper";
const Chat = ({socket, userName, token, room, user, msg , closeChat }) => {
    const dataConversations = msg
    const chatContainerRef = useRef(null)
    const [messages, setMessages] = useState([])
    const myId = getUserToken().userObj.userID 
    function scrollToBottom() {
        if(chatContainerRef.current){
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
}
  }

    // solo tiene que ejecutarse una vez el efecto y despues mostrar el contenido en real time
    // esto quiere decir que si recargamos recojera los mensajes que estaban ya en base de datos mas los que hemos enviado 
    // en real time.
    //FETCHING DE DATOS PARA CARGAR CONVERSACION PREVIA 
    useEffect( () =>{
        const getMsg = async (chatid) =>{
            const userSession = getUserToken()
            let headers = {
                Authorization: `Bearer ${userSession.jwtToken}`,
            };
            let res = await   Request (`/chat/${chatid}`,"get",undefined,headers)
                if(res?.error){
                    alert(res.message)
                }else{
                    setMessages(res.message)
                    scrollToBottom()
                }
        }
        getMsg(room)
    },[""])






    // CUANDO ENTRA UN NUEVO MENSAJE POR SOCKET, CON LA CONVERSACIONO YA PRECARGADA LO METEMOS DENTRO DEL ARRAY DE MENSAJES.
    useEffect(() =>{
        const recieveMessage = (data) => {
            console.log("esta es la data que me llega", data)
            setMessages([...messages, {content: data.content,sender: [data.from]}])
            console.log("lo que me envian",data)
            setTimeout(() => {
    scrollToBottom()
  }, 0)
        }
        socket.on('reply', recieveMessage)
        return () => {
            socket.off('reply', recieveMessage)
        }
    },[messages])
    console.log("estos son los datos que me llegan despues",messages)
    const Socket = socket
    const name = userName
    const {register, handleSubmit, reset} = useForm() 



const onSubmit = (data) => {
    console.log(data)
    Socket.emit('message', {message: data.message, user: myId , token: token, room : room})
    console.log(data)
    const newMessage = { content : data.message,sender: [{_id:myId}]}
    setMessages([...messages, newMessage])
      setTimeout(() => {
    scrollToBottom()
  }, 0)
    reset()
}

const handleCloseChat = () => {
    closeChat(false)
}

  return (
    <div className={styles.chatContainer}>
        <div className={styles.textContainer}>
            <div className={styles.user}>
            {user}
            <GoX onClick={handleCloseChat}/>
            </div>
            <div  className={styles.textMsg}>
                <div ref={chatContainerRef} className={styles.scroller}>
                {messages.map((line) =>{
                    if(line.sender[0]._id === myId || line.sender[0].id === myId ){
                        return <div className={styles.me}><span className={styles.chatStart}>{line.content}</span></div>
                    }else{
                        return <div className={styles.it}><span className={styles.chatEnd}>{line.content}</span></div>
                    }
                    return <div>{line.content}</div>
                }
                //{line.sender[0]._id === myId ? return <p>{line.sender[0]._id}</p> : <p>{line.sender[0]._id}</p>} 
                //<li>{line.content}{console.log("estos son las id de los participants",line.sender[0]._id)}</li>
                )}
                </div>   
            </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
            <input {...register("message")} className={styles.type}/>
            <input type="submit" className={styles.send}/>  
        </form>
    </div>
  )
}

export  {Chat};