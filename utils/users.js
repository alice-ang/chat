const users = [];

// Join user to chat
userJoin = (id, username, room) => {
    const user = {id, username, room};

    users.push(user);

    return user;
}

// Get current user
getCurrentUser = (id) => {

    return users.find(user => user.id === id);
}
// User leaves chat
userLeave = (id) => {
    const index = users.findIndex(user => user.id === id);

    if(index !== -1){
        return users.splice(index, 1)[0];
    } 
}

// get room users
getRoomUsers = (room) => {
    return users.filter(user => user.room === room); 
}



module.exports = {
    userJoin,
    getCurrentUser,
    userLeave, 
    getRoomUsers
}