var express = require("express"),
    cors = require("cors"),
    bodyParser = require("body-parser"),
    expressValidator = require("express-validator"),
    cookieSession = require("cookie-session"),
    app = express(),
    port = process.env.PORT || 8080;

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(expressValidator());

/*MySql connection*/
var connection = require("express-myconnection"),
    mysql = require("mysql"),
    CLEARDB_DATABASE_URL = process.env.CLEARDB_DATABASE_URL;

app.use(connection(mysql, CLEARDB_DATABASE_URL, "pool"));

app.set("trust proxy", 1);

app.use(cookieSession({
    name: "session_api",
    secret: process.env.SECRET,
    maxAge: 60 * 60 * 1000 * 24 // <- hours session expire
}));

//Middleware - Performance monitor
const performance_monitor = (req, res, next) => {
    // Show response time in millisecond
    const start = Date.now();
    res.on("finish", () => {
        console.log("Request Passed to ", req.method, req.url, "|", Date.now() - start, "ms");
        console.log(req.session)
    });

    next();
};

//Test - Server and MySql connection
const test_connection = (req, res, next) => {
    // Get connection
    req.getConnection(function(err, conn) {
        if (err) return res.sendStatus(503);
        return res.sendStatus(200);
    });
};

//Monitor Route
app.use(performance_monitor);
//Test Route
app.use("/test-connection", test_connection);
//Student Routes
app.use("/api/student", require("./api/routes/studentRoute"));
//Admin Routes
app.use("/api/authority", require("./api/routes/authorityRoute"));

//Start Server
var server = app.listen(port, function() {
    console.log("AuOpenHouse RESTful API server started on port :: %s", server.address().port);
});