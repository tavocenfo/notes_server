const express = require('express');

const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

var tags = [
    { id: 1, name: "Trabajo" },
    { id: 2, name: "Personal" }
];

var notes = [
    { id: 1, title: "Android Room", description: "Clase donde veremos como crear un local database", date_created: 1, tag: tags[0] },
    { id: 2, title: "Limpiar Cuarto", description: "Ordernar y botar cosas innecesarias", date_created: 1, tag: tags[1] },
    { id: 3, title: "Android Retrofit", description: "Clase donde veremos como crear conexiones a un server", date_created: 1, tag: tags[0] }
];

var lastNoteId = 4;
var lastTagId = 3;

// Notes Crud
app.get('/notes', (req, res, next) => {
    res.status(200).send(notes);
});

app.post('/notes', (req, res, next) => {
    try {
        const note = {
            id: lastNoteId,
            title: req.body.title,
            description: req.body.description,
            date_created: req.body.date_created,
            tag: tags.find(element => element.id == req.body.tagId)
        };
        lastNoteId++;
        notes.push(note);
        res.status(200).send(note);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error Adding a new note");
    }

});

app.delete('/notes/:id', (req, res, next) => {
    try {
        const index = notes.findIndex(element => element.id == req.params.id);
        if (index > -1) {
            notes.splice(index, 1)
            res.status(200).send("Element was deleted");
        } else {
            res.status(404).send("Element not found");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error Deleting a note");
    }
});

app.put('/notes/:id', (req, res, next) => {
    try {
        const index = notes.findIndex(element => element.id == req.params.id);
        if (index > -1) {
            notes[index].title = req.body.title;
            notes[index].description = req.body.description;
            notes[index].date_created = req.body.date_created;
            notes[index].tag= tags.find(element => element.id == req.body.tagId);
            res.status(200).send(notes[index]);
        } else {
            res.status(404).send("Element not found");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error Deleting a note");
    }
});

// Tags Crud
app.get('/tags', (req, res, next) => {
    res.status(200).send(tags);
});

app.post('/tags', (req, res, next) => {
    try {
        const tag = {
            id: lastTagId,
            name: req.body.name
        };
        lastTagId++;
        tags.push(tag);
        res.status(200).send(tag);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error Adding a new tag");
    }
});

app.delete('/tags/:id', (req, res, next) => {
    try {
        const index = tags.findIndex(element => element.id == req.params.id);
        if (index > -1) {
            // delete tag
            tags.splice(index, 1)
            // delete notes related to the tag
            notes = notes.filter(element => element.tag.id != req.params.id)
            res.status(200).send("Element was deleted");
        } else {
            res.status(404).send("Element not found");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error Deleting a note");
    }
});

app.put('/tags/:id', (req, res, next) => {
    try {
        const index = tags.findIndex(element => element.id == req.params.id);
        if (index > -1) {
            tags[index].name = req.body.name;
            res.status(200).send(tags[index]);
        } else {
            res.status(404).send("Element not found");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error Deleting a note");
    }
});


// Require the Routes API 
// Create a Server and run it on the port 3000
const server = app.listen(3000, function () {
    let host = server.address().address
    let port = server.address().port
    // Starting the Server at the port 3000
})