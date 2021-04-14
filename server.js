const express = require("express");
const exphs = require("express-handlebars");
const session = require("express-session");
const path = require("path");
const sequelize = require("./config/connection.js");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const compression = require('compression');
const helpers = require("./utils/helpers");
const controllers = require("./controllers");
const middleware = require("./middlewares");

const app = express();
const PORT = process.env.PORT || 8080;
const hbs = exphs.create({ helpers });

// Compression
app.use(compression({ filter: shouldCompress, level: -1 }))

function shouldCompress(req, res) {
    if (req.headers['x-no-compression']) {
        // don't compress responses with this request header
        return false
    }

    // fallback to standard filter function
    return compression.filter(req, res)
}

// HTTP socket.io
const http = require('http').Server(app);
const io = require('socket.io')(http);
const socketHelpers = require("./utils/socketHelpers")(io);

// //socket emitters/listeners
// io.on('connection', socketHelpers);

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