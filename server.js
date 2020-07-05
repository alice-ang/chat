const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')
const formatMessage = require('./utils/messages')
const {userJoin, getCurrentUser, userLeave, getRoomUsers } = require('./utils/users')
const app = express()
const server = http.createServer(app)
const io = socketio(server)

// Set static folder
app.use(express.static(path.join(__dirname, 'public')))



const botName = 'Chat Bot';

// Run when client connects
io.on('connection', socket => {
    //
    socket.on('join-room', ({username, room}) => {
    
    const user = userJoin(socket.id, username, room);

    socket.join(user.room)
    // Welcome current user 
    socket.emit('message', formatMessage(botName, 'Welcome to chat!')); 

    // broadcast when a user connects
    socket.broadcast.to(user.room).emit('message', formatMessage(botName,`${user.username} has joined the chat!`));

        // Listen for chat-message
        socket.to(user.room).on('chat-message', msg => {
            const user = getCurrentUser(socket.id);
            io.to(user.room).emit('message', formatMessage(`${user.username}`,msg))
        })
    
        // send users and room info
        io.to(user.room).emit('room-users', {
            room: user.room,
            users: getRoomUsers(user.room)
        });
    })

    // Runs when client dcs
    socket.on('disconnect', ()=> {
        const user = userLeave(socket.id);
        if(user){
            io.to(user.room).emit('message', formatMessage(botName, `${user.username} has left the chat`))
            // Send users and room info
            io.to(user.room).emit('room-users', {
                room: user.room,
                users: getRoomUsers(user.room)
            });
        }
   });
    
});

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`server running on port ${PORT}`);
    
})