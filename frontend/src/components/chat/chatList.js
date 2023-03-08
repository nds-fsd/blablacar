import { useEffect,useState } from "react";
import styles from "./chatList.module.css";
import { Request } from "../../utils/apiWrapper";
import { getUserToken } from "../../utils/storage";
import UserAvatar from "../userAvatar/UserAvatar";
import io from "socket.io-client";
import {Chat} from "./chat"
const token = getUserToken()?.jwtToken
const userName = getUserToken()?.userObj.surname

 export const socket = io("http://localhost:3001", {
  path: "/private",
  reconnectionDelayMax: 10000,
  auth: {
    token,
  },
});
const ChatList =()=>{

    const [msg,setMsg] = useState("");
    const [roomChat, setRoomChat] = useState('')
    const [user,setUserName] = useState('');
    const [chats,setChats] = useState("");
    const [openChat, setOpenChat] = useState(false)
    const userSession = getUserToken()
    useEffect(() => {
            if(token){
                socket.connect();
                socket.on("connection", (data) => {
                  console.log("Connected");
                });     
            }    
      }, [socket]);

    useEffect(()  => {
        const getChat = async () =>{
            const userSession = getUserToken()
            let headers = {
                Authorization: `Bearer ${userSession.jwtToken}`,
            };
            let res = await Request ("/chat/","get",undefined,headers)
                if(res?.error){
                    alert(res.message)
                }else{
                    setChats(res)
                }
        }
        getChat()
    },[]);
    const getMsg = async (chatid) =>{
        const userSession = getUserToken()
        let headers = {
            Authorization: `Bearer ${userSession.jwtToken}`,
        };
        let res = await Request (`/chat/${chatid}`,"get",undefined,headers)
            if(res?.error){
                alert(res.message)
            }else{
                setMsg(res.message)
            }
    }
   
    const join = (room) => {
        socket.emit('join-chat',room)
        setRoomChat(room)
    }
    const participant = (nameUser,chatId) =>{
        setUserName(nameUser)
        getMsg(chatId)
        setOpenChat(true)
    }


    return (
        
        <div>
        <div className={styles.background}>
            chats
            <div className={styles.dropupContent}>
                {chats && chats.map((chats,i)=>(              
                            <div key={i}>
                            {chats.participants.map((user) =>
                                <a>
                            
                                {user._id !== userSession.userObj.userID ?
                                    <div className={styles.diseñoChatUser} onClick={() => join(chats._id)}>
                                        {/* <span className={styles.icon}><UserAvatar user={user.surname} picUrl={user.picUrl}/></span> */}
                                        <span className={styles.icon}>{user.surname.charAt(0)}</span>
                                        <span className ={styles.name} onClick={() => participant(user.surname,chats._id)}>{user.surname}</span>
                                    </div>:""
                                }
                                   
                                </a>
                                          
                            )} 
                            </div>
                        ))
                }
            </div>

            
            

            
        </div>
        {openChat && <Chat socket={socket} userName={user.surname} token={token} room={roomChat} user={user} msg={msg} closeChat={setOpenChat}/> }
        </div>
    )
}

export {ChatList}