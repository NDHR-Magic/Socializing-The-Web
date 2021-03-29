const users = [];

exports = module.exports = function (io) {
    io.on('connection', function (socket) {
        socket.on('user connect', (user) => {
            // See if user is connected
            let exists = false;
            for (const i of users) {
                if (i === user) {
                    exists = true;
                }
            }
            // if not connect, push into users list
            if (!exists) {
                users.push(user);
            }

            io.emit('log connect', { user, connected: users.length });
        });
        socket.on('chat message', (msg) => {
            socket.broadcast.emit('chat message', msg);
        });
        socket.on("user disconnect", (user) => {
            const index = users.indexOf(user);
            users.splice(index, 1);
            io.emit('log disconnect', { user, connect: users.length });
        })
    });
}