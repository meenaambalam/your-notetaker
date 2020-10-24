// Dependencies
// =============================================================
let express = require("express");
let fs = require("fs");
let path = require("path");
let notes = require("./db/db.json"); 
let util = require("util"); //util to promisify the writeFile function
let { v4 : uuidv4 } = require('uuid');  //package that generates random id - version update 3.1.0

let writeFileAsync = util.promisify(fs.writeFile); //promisification of writeFile method

// Sets up the Express App
// =============================================================
let app = express();
let PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// Routes
// =============================================================

// get /notes route - route that sends the user to the "notes" page
app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "/public/assets/notes.html"));
});

//get api route  - gets all the notes from db.json file and sends that response as json to the requestor
app.get("/api/notes", function(req, res) {
    res.json(notes);
  });

//post api route - posts the new Note sent from notes.html, to the notes array and writes to the db.json file
app.post("/api/notes", function(req, res) {
    let note = req.body;
    let id = uuidv4();  //generates unique id
    note.id = id;
    notes.push(note);   //push the new Note to the notes array of JSON object
    writeFileAsync("db/db.json", JSON.stringify(notes, null, 2)).then(function(){
        res.json(note);
    }).catch(function(err){
        console.log(err);
    });
  });

//delete api route to delete specific note by matching the id of the note chosen for deletion
app.delete("/api/notes/:id", function(req, res) {
    let idToRemove = req.params.id;
    notes = notes.filter((note) => note.id !== idToRemove);
    
    console.log("retainedNotes: " + JSON.stringify(notes));
    writeFileAsync("db/db.json", JSON.stringify(notes, null, "\t")).then(function(){
        res.send("Deleted Note");
    }).catch(function(err){
        console.log(err);
    });
});

//get api route - catch all route, that will render the home page
app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/assets/index.html"));
});
  

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
