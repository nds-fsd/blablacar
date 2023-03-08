const { jwtTokenVerify } = require("../Middleware/jwtMiddleware");
const socketio = require("socket.io");

const configurePrivateSocket = (server) =>{
    const io = socketio(server, {
        cors:{
            orgin: "*",
        },
        path: "/private"
    });

    io.use((socket, next) =>{
        if(socket.handshake.auth && socket.handshake.auth.token){
            jwtTokenVerify(socket.handshake.auth.token, (err,user) =>{
                if (err) return next(new Error("Authentication error"));
                socket.user = user;
                next();
            });
        }else{
            next(new Error("Authentication error"));
        };
    });

    io.on("connection", (client) => {
        client.emit("connection", "You are now connected");
        client.join(`user-${client.user.id}`);
    
        client.on("join-chat", (chatId) => {
          client.join(`chat-${chatId}`);
        });
      });

    return io;
};