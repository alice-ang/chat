const socket = io();

const chatForm = document.getElementById('chat-form');
const messageContainer = document.getElementById('message-container');
const messageInput = document.getElementById('message-input');
const roomName = document.getElementById('room-name')
const userList = document.getElementById('users')
// Get username and room from url
const {username, room} = Qs.parse(location.search, {
    ignoreQueryPrefix: true
});

// Join chatroom

socket.emit('join-room', {username, room});

// get room and users
socket.on('room-users', ({users, room}) => {
    outputRoomName(room);
    outputUsers(users);
});


socket.on('message', message => {
    outputMessage(message);
    messageContainer.scrollTop = messageContainer.scrollHeight;
})

chatForm.addEventListener('submit', e =>{
    e.preventDefault();
    // Get text from input
    const msg = messageInput.value;

    // emit message to server
    socket.emit('chat-message', msg);
    
    // Clear input and focus
    messageInput.value ='';
    messageInput.focus();
})


 outputMessage = (message) =>{
    const messageDiv = document.createElement('div');
    messageDiv.classList.add('message')
    messageDiv.innerHTML = `<p class="message-info"> ${message.username} <span> [${message.time}] </span</p>
    <p>${message.text}</p>`;
    messageContainer.append(messageDiv);
}
// Add room name to DOM
outputRoomName = (room) => {
    roomName.innerText = room;
}

// Add users to DOM
outputUsers = (users) => {
    userList.innerHTML = '';
    users.forEach(user => {        
        const listItem = document.createElement('li');
        const item = document.createTextNode(user.username);
        listItem.appendChild(item);
        userList.appendChild(listItem);
        document.getElementById('current-user').innerText = user.username;

    });
    
}


// Menu script
 openNav = () =>{
    document.getElementById("mySidenav").style.width = "250px";
}
  
closeNav= () =>{
document.getElementById("mySidenav").style.width = "0";
}