var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var mongodb = require('mongodb');

app.set("view engine", "ejs");

//dùng để lấy dữ liệu từ POST
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'));
app.use("/component", express.static("bower_components"));

var MongoClient = mongodb.MongoClient;
var url = "mongodb://localhost:27017/mydb"//"mongodb://" + "localhost" + ":" + "21017" + "/" + dbname;
    
app.get("/", function(req, res) {
    res.render("index", {
        mathResult: null
    })
})
app.get("/process", function(req, res) {
    res.render("process", {data: req.query.sample_text});
})
app.post("/", function(req, res) {
    var rslt = 0;
    var log = "";
    var x = Number(req.body.firstNum),
        y = Number(req.body.secondNum);
    switch (req.body.mathMethod) {
        case "+": rslt = x + y; break;
        case "-": rslt = x - y; break;
        case "*": rslt = x * y; break;
        case "/": rslt = x / y; break;
        default: rslt = "Oops!"
    }
    /*switch (req.body.mathMethod) {
        case "+":case "-":case "*":case "/":
        log = x + " " + req.body.mathMethod + " " + y + " = " + rslt;
        MongoClient.connect(url, function(err, db) {
            if (err) throw err;
            db.collection("MathLogs").insertOne({log: log, time: Date()}, function (err, res) {
                if (err) throw err;
                console.log(res.result);
                db.close();
            })
        })
    }*/
    res.render("index", {
        mathResult: rslt,
    })
})

var server = app.listen(process.env.PORT || 8081, function() {
    var host = server.address().address
    var port = server.address().port
    /*
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        db.createCollection("MathLogs", function(err, res) {
            if (err) throw err;
            console.log("collection created!");
            db.close();
        });
    })*/

    console.log("I'm host " + host + ", port " + port + ". I'm listening...");
})