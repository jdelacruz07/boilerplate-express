var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var env = require('node-env-file'); // .env file
const { json } = require('body-parser');
env(__dirname + '/.env');
console.log("Hello World")

app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.urlencoded(bodyParser.json()));

app.use("/public", express.static(__dirname + "/public"));

app.use(function (req, res, next) {
    console.log(req.method, req.path, req.ip);
    next();
})

app.post("/name", (req, res) => {
    // console.log(req.body)
    var firstName = req.body.first;
    var lastName = req.body.last;
    res.json({ name: `${firstName} ${lastName}` })
});

app.get("/:word/echo", (req, res) =>
    // res.send({"echo": req.params.word})
    res.json(req.params)
);

app.get('/now', function (req, res, next) {
    req.time = new Date().toString();
    next();
}, function (req, res) {
    res.send({ time: req.time });
});

app.get("/json", (req, res) => {
    var uppercase = "uppercase";
    if (process.env.MESSAGE_STYLE == uppercase) {
        res.json({ "message": "HELLO JSON" })
    } else {
        res.json({ "message": "Hello json" })
    }
});

app.get("/", (req, res) => {
    console.log(req.body)
    res.sendFile(__dirname + "/views/index.html")
});



































module.exports = app;
