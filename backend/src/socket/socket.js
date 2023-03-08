const socketio = require("socket.io");
const {jwtVerifier} = require('../Middleware/jwtMiddleware')
const secret = process.env.JWT_SECRET
const fetch = require('node-fetch')

const privateSocket = (server) =>{
    const io = socketio(server,{
        cors:{
            origin: "*"
        },
        path: "/private",
    })
    io.use((socket, next) => {
        if (socket.handshake.auth && socket.handshake.auth.token) {
          jwtVerifier(socket.handshake.auth.token, (err, user) => {
            if (err) return next(new Error("Authentication error"));
            next();
          });
        } else {
          next(new Error("Authentication error"));
        }
      });
    io.on("connection",(socket)=>{
        socket.emit("connection","you are connected")
        socket.join(socket.id) //  meterlo en una room con su socket.id 
      

        socket.on('message', data => {
          //fetch de tipo post
          // esto devuelvemelo del tiron 
           socket.to(data.room).emit('reply', {
              from: data.user,
              content: data.message,
              room: data.room
           })
           
          const options = {
              method : 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data.token}`
            }, body: JSON.stringify({
              "sender": data.user,
              "content": data.message,
              "chat": data.room
            })
          }
          

          // asyncronia sin preocupaciones que tarde lo que sea 
           fetch("http://localhost:3001/message", options)
           .then(response => response.json())
          .then(dataEndpoint => console.log(dataEndpoint))

           
        })

        socket.on('disconnect', () => {
        console.log(`Client disconnected ${socket.id}`)
        
        })
        
        socket.on('join-chat', room => {
          socket.join(room)
          console.log(`el socket con is ${socket.id} a entrado en la room ${room}`)
        })
        


    })

    return io;
}
module.exports = { privateSocket };