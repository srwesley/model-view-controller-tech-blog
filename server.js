// Gets path to stylesheet
const path = require("path");
const express = require("express");

// Imports express session
const session = require("express-session");

// Sets up express handlebars template engine
const exphbs = require("express-handlebars");

// Routes files will work as controller
const routes = require("./controllers");

// Imports sequelize connection
const SequelizeStore = require("connect-session-sequelize")(session.Store);
const sequelize = require("./config/connection");

// Imports helpers
const helpers = require("./utils/helpers");

// Sets up app and port
const app = express();
const PORT = process.env.PORT || 3001;

// Sets up session cookie and connects to the Sequelize db
const secretSession = {
    secret: "Super secret",
    cookie: {
        maxAge: 300000, // 300,000 ms = 5 minutes
        httpOnly: true,
        secure: false,
        sameSite: "strict",
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

app.use(session(secretSession));

// Sets up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// Informs Express.js on which template engine to use
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.use(routes);

// Prevents page caching on browser to protect from back button navigation into protected resource after logout
app.use(function (req, res, next) {
    res.header("Cache-Control", "private, no-cache, no-store, must-revalidate");
    res.header("Expires", -1);
    res.header("Pragma", "no-cache");
    next();
});

// Every time the server restarts, it forces true for cookies to restart
// False when program is ready
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`\nListening in on port ${PORT}. Visit http://localhost${PORT} and create an account!`));
});