import { useEffect,useState } from "react";
import styles from "./chat.module.css";
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

    const [chats,setChats] = useState("");
    const [roomChat, setRoomChat] = useState('')
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

    const join = (room) => {
        socket.emit('join-chat',room)
        setRoomChat(room)
    }

    return (
        <div>
        <div className={styles.background}>
            chats
            <div className={styles.dropupContent}>
                {chats && chats.map((chats,i)=>(              
                            <div key={i}>
                            {chats.participants.map((user) =>
                                <p>
                                {user._id !== userSession.userObj.userID ? 
                                    <div className={styles.diseñoChatUser} onClick={() => join(chats._id)}>
                                        {/* <span className={styles.icon}><UserAvatar user={user.surname} picUrl={user.picUrl}/></span> */}
                                        <spa className={styles.icon}>{user.surname.charAt(0)}</spa>
                                        <spa className ={styles.name}>{user.surname}</spa>
                                    </div>:""
                                }    
                                </p>
                                          
                            )} 
                            </div>
                        ))
                }
            </div>
            

            
        </div>
        <Chat socket={socket} userName={userName} token={token} room={roomChat}/>
        </div>
    )
}

export {ChatList}