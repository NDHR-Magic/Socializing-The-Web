const express = require("express");
const exphs = require("express-handlebars");
const session = require("express-session");
const path = require("path");
const sequelize = require("./config/connection.js");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const helpers = require("./utils/helpers");
const controllers = require("./controllers");
const middleware = require("./middlewares");

const app = express();
const PORT = process.env.PORT || 8080;
const hbs = exphs.create({ helpers });

const http = require('http').Server(app);
const io = require('socket.io')(http);

//socket emitters/listeners
const users = []
io.on('connection', (socket) => {
    socket.on('user connect', (user) => {
        console.log(users);
        console.log("\n\n\n");

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

const sess = {
    secret: "Not 100% sure how to use secrets, secret",
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

// Handlebars engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use("/", middleware.getRequests);

app.use(controllers);

sequelize.sync({ force: false }).then(() => {
    http.listen(PORT, () => console.log(`Listening on the coolest PORT ${PORT}`));
})