const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const tags = require("../model/tags");
const notes = require("../model/notes");

var lastNoteId = 4;

router.get('/', auth, (req, res, next) => {
    console.log("Getting notes");
    res.status(200).send(notes);
});

router.post('/',auth, (req, res, next) => {
    try {
        const note = {
            id: lastNoteId,
            title: req.body.title,
            description: req.body.description,
            date_created: req.body.date_created,
            tag: tags.find(element => element.id == req.body.tag.id)
        };
        lastNoteId++;
        notes.push(note);
        console.log("Note Added");
        res.status(200).send(note);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error Adding a new note");
    }

});

router.delete('/:id',auth, (req, res, next) => {
    try {
        const index = notes.findIndex(element => element.id == req.params.id);
        if (index > -1) {
            notes.splice(index, 1)
            console.log("Note Deleted");
            res.status(200).send("Element was deleted");
        } else {
            res.status(404).send("Element not found");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error Deleting a note");
    }
});

router.put('/:id',auth, (req, res, next) => {
    try {
        const index = notes.findIndex(element => element.id == req.params.id);
        if (index > -1) {
            notes[index].title = req.body.title;
            notes[index].description = req.body.description;
            notes[index].date_created = req.body.date_created;
            notes[index].tag= tags.find(element => element.id == req.body.tag.id);
            console.log("Note Updated");
            res.status(200).send(notes[index]);
        } else {
            res.status(404).send("Element not found");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error Deleting a note");
    }
});

module.exports = router;