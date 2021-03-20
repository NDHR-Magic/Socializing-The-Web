const express = require("express");
const exphs = require("express-handlebars");
const session = require("express-session");
const path = require("path");
const sequelize = require("./config/connection.js");
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const helpers = require("./utils/helpers");
const controllers = require("./controllers");

const app = express();
const PORT = process.env.PORT || 8080;
const hbs = exphs.create({});

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

app.use(controllers);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Listening on the coolest PORT ${PORT}`));
})