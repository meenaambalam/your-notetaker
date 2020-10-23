// Dependencies
//==========================
const express = require("express");
const path = require("path");
const fs = require("fs");
const lineReader = require("line-reader");
const { allowedNodeEnvironmentFlags } = require("process");

// Sets up the Express App
//=============================
const app = express();
const PORT = process.env.PORT || 3001;

//Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true}));
app.use(express.json());
app.use(express.static("public"));

//Notes locally saved in array for easy of use
//=====================
//let notesArray;


// Routes
//======================
//Basic route that sends the user first to the AJAX Page
app.get("/notes", function(req, res){
    res.sendFile(path.join(__dirname, "/public/notes.html"));
});

// Displays the existing notes in the Array
app.get("/api/notes", function(req, res){
    //Need to get the data from file
    let noteArray = [
        {
            title: "",
            text: ""
        }
    ];
    // let notes = fs.readFileSync('./db/db.json');
    // if (notes){
    //     res.send(notes);
    // }

    lineReader.eachLine('./db/db.json', function(line,last){
        noteArray.push(line);
        console.log(noteArray);
        if(last){
            res.send(noteArray);
            console.log("completed");
        }
    })
    //return res.json(noteDisplay);
});

app.post("/api/notes", function(req, res){
    //write the data to file and return the new note to the client
    //fs.writeFile("/db/db.json", )

    return res.json(newNote);
});

app.delete("/api/notes/:id", function(req, res){
    //read all notes from the file 
    //remove the one with given id property
    //rewrite th notes to the db.json file
    //retun the db.json file contents

    return res.json(notes);
});

app.get("*", function(req, res){
    res.sendFile(path.join(__dirname, "/public/index.html"));
});


// Starts the server to begin listening
//======================================
app.listen(PORT, function(){
    console.log("NoteTaker App listening on PORT " + PORT);
});