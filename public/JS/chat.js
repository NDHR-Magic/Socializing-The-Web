const socket = io();
const form = document.getElementById('form');
const input = document.getElementById('input');
const usersConnected = document.getElementById("connected");

form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (input.value) {
        const item = document.createElement('li');
        // Store username
        const user = input.getAttribute("data-user");

        // Create text and append to message ul
        item.textContent = "From me: " + input.value;
        messages.appendChild(item);
        window.scrollTo(0, document.body.scrollHeight);

        socket.emit('chat message', { username: user, input: input.value });
        input.value = '';
    }
});

socket.on('chat message', function (msg) {
    const item = document.createElement('li');
    item.textContent = msg.username + ": " + msg.input;
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
});

//if someone connects
window.addEventListener("load", function () {
    socket.emit("user connect", input.getAttribute("data-user"));
});
document.addEventListener("visibilitychange", function () {
    if (document.visibilityState === 'visible') {
        socket.emit("user connect", input.getAttribute("data-user"))
    } else {
        socket.emit("user disconnect", input.getAttribute("data-user"));
    }
});

socket.on('log connect', function (data) {
    const item = document.createElement('li');
    item.textContent = data.user + " has connected";
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);

    usersConnected.textContent = data.connected;
});

//if disconnect
socket.on('log disconnect', function (data) {
    usersConnected.textContent = data.connected;

    const item = document.createElement('li');
    item.textContent = data.user + " has disconnected";
    messages.appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);

    usersConnected.textContent = data.connect;
})
