// Dependencies
const express = require("express");
var path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3001;

//Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


// (DATA)
// 
var notes = [];

console.log("dirname: " + __dirname);

// Routes
// Basic route that sends the user first to the AJAX Page
app.get("/notes", function (req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
});

app.get("*", function (req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
})


app.get("/api/notes", function (req, res) {
    let rawData = fs.readFileSync('../db/db.json');
    let dbData = JSON.parse(rawData);
    console.log(dbData);
    res.json(dbData);
});

//Receives new note to save on the request body, add it to the db.json file, and return the new note to the client
app.get("/api/notes", function(req,res){
    let newNote = req.body;
    fs.writeFileSync("../db/db.json")
})

//Starts the server to begin listening
//===========================================
app.listen(PORT, function () {
    console.log("App listening on PORT " + PORT);
})



