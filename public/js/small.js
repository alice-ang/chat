const roomInput = document.getElementById('add-room');
const select = document.getElementById('room');

document.getElementById('add-btn').addEventListener('click', e => {
        
    const newRoom =  roomInput.value;
    console.log(newRoom);
    const addedRoom = document.createElement('option');
    addedRoom.text = newRoom;
    addedRoom.value = newRoom;

    select.appendChild(addedRoom);


})