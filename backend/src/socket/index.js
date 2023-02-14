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
                console.log(`User: ${user.name}`);
                next();
            });
        }else{
            next(new Error("Authentication error"));
        };
    });

    io.on("connection", (client) => {
        client.emit("connection", "You are now connected");
        client.join(`user-${client.user.id}`);
    
        console.log(
          `User: ${client.user.name} has now its session with id ${client.user.id}`
        );
    
        client.on("join-chat", (chatId) => {
          client.join(`chat-${chatId}`);
          console.log(`User: ${client.user.name} joined chat ${chatId}`);
        });
      });

    return io;
};