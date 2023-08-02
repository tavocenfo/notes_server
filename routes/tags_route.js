const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const tags = require("../model/tags");
const notes = require("../model/notes");

var lastTagId = 3;
// Tags Crud
router.get('/',auth, (req, res, next) => {
    console.log("Getting Tags");
    res.status(200).send(tags);
});

router.post('/',auth, (req, res, next) => {
    try {
        const tag = {
            id: lastTagId,
            name: req.body.name
        };
        lastTagId++;
        tags.push(tag);
        console.log("Tag Added");
        res.status(200).send(tag);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error Adding a new tag");
    }
});

router.delete('/:id',auth, (req, res, next) => {
    try {
        const index = tags.findIndex(element => element.id == req.params.id);
        if (index > -1) {
            // delete tag
            tags.splice(index, 1);
            // delete notes related to the tag
            let copyNotes = notes.slice();
            for(let i = 0; i< copyNotes.length; i++) {
                for (let j = i; j < notes.length; j++) {
                    if(notes[j].tag.id == req.params.id){
                      notes.splice(j, 1);
                      break;
                    }
                    
                }
            }
            console.log("Tag Deleted");
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
        const index = tags.findIndex(element => element.id == req.params.id);
        if (index > -1) {
            tags[index].name = req.body.name;
            console.log("Tag Updated");
            res.status(200).send(tags[index]);
        } else {
            res.status(404).send("Element not found");
        }
    } catch (error) {
        console.log(error);
        res.status(500).send("Error Deleting a note");
    }
});

module.exports = router;