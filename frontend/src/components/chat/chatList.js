import { useEffect,useState , useRef } from "react";
import styles from "./chatList.module.css";
import { Request } from "../../utils/apiWrapper";
import { getUserToken } from "../../utils/storage";
import io from "socket.io-client";
import IconLogo from '../assets/user.png'
import { Chat } from "./chat"
import UserAvatar from "../userAvatar/UserAvatar";
const token = getUserToken()?.jwtToken
const SOCKET_URL = window.location.hostname === 'pimpambuga.netlify.app'
    ? 'https://pimpambuga.up.railway.app'
    : "http://localhost:3001";
export const socket = io(SOCKET_URL, {
    path: "/private",
    reconnectionDelayMax: 10000,
    auth: {
        token,
    },
});
const ChatList = ({ stateChat }) => {
    console.log('como esta el estado ', stateChat)

    const [msg, setMsg] = useState("");
    const [roomChat, setRoomChat] = useState('')
    const [user, setUserName] = useState('');
    const [chats, setChats] = useState("");
    const [openChat, setOpenChat] = useState(false)
    const userSession = getUserToken()
    const token = useRef(getUserToken()?.jwtToken)
    useEffect(() => {
        if (token) {
            socket.connect();
            socket.on("connection", (data) => {
                console.log("Connected");
            });
        }
    }, [socket]);

    useEffect(() => {
        const getChat = async () => {
            const userSession = getUserToken()
            if(!userSession){
                return
            }
            let headers = {
                Authorization: `Bearer ${userSession.jwtToken}`,
            };
            let res = await Request("/chat/", "get", undefined, headers)
            if (res?.error) {
                alert(res.message)
            } else {
                setChats(res)
            }
        }
        getChat()
    }, []);
    const getMsg = async (chatid) => {
        const userSession = getUserToken()
        let headers = {
            Authorization: `Bearer ${userSession.jwtToken}`,
        };
        let res = await Request(`/chat/${chatid}`, "get", undefined, headers)
        if (res?.error) {
            alert(res.message)
        } else {
            setMsg(res.message)
        }
    }

    const join = (room) => {
        socket.emit('join-chat', room)
        setRoomChat(room)
    }
    const participant = (nameUser, chatId) => {
        setUserName(nameUser)
        getMsg(chatId)
        setOpenChat(true)
    }


    return (

        <div>
            <div className={styles.background}>
                chats
                <div className={styles.dropupContent}>
                    {chats && chats.map((chats, i) => (
                        <div key={i}>
                            {chats.participants.map((user) =>
                                <>

                                    {user._id !== userSession.userObj.userID ?
                                        <div className={styles.diseñoChatUser} onClick={() => join(chats._id)}>
                                            {/* <span className={styles.icon}>{user.surname.charAt(0)}</span> */}
                                            {console.log("esta es la picUrl",user)}
                                        
                                            {user.picUrl && user.picUrl.length === 0 ? <span>{user.surname.charAt(0)}</span> : <span>{<img src={user.picUrl} className={styles.icon} />}</span>}

                                            <span className={styles.name} onClick={() => participant(user, chats._id)}>{user.surname}</span>
                                        </div> : ""
                                    }
                                </>

                            )}
                        </div>
                    ))
                    }
                </div>





            </div>
            {openChat && <Chat socket={socket} userName={user} token={token} room={roomChat} user={user} msg={msg} closeChat={setOpenChat} />}
        </div>
    )
}

export { ChatList }