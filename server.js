// Dependencies
// =============================================================
var express = require("express");
var fs = require("fs");
var path = require("path");
var notes = require("./db/db.json");
var util = require("util");
var { v4 : uuidv4 } = require('uuid');

var writeFileAsync = util.promisify(fs.writeFile);

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/assets/notes.html"));
});

app.get("/api/notes", function(req, res) {
    //let notes = fs.readFileSync('./db/db.json');
    //if (notes){
        console.log("notes: " + notes);
        res.json(notes);
    //}
  });

app.post("/api/notes", function(req, res) {
    
    var note = req.body;
    var id = uuidv4();
    note.id = id;
    notes.push(note);
    writeFileAsync("db/db.json", JSON.stringify(notes)).then(function(){
        res.json(note);
    }).catch(function(err){
        console.log(err);
    });
  });

app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/assets/index.html"));
});
  

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
