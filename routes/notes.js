const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const uniqid = require('uniqid');

router.get('/notes', (req, res, next) => {
    fs.readFile(path.join(__dirname, '..', 'db.json'), ((err, data) => {
        if (data !== undefined) {
            res.json(JSON.parse(data));
        }
    }));
});

router.post('/notes', (req, res, next) => {
   let note = {id: uniqid(), title: req.body.title, text: req.body.text};
    fs.readFile(path.join(__dirname, '..', 'db.json'), ((err, data) => {
       let notes = JSON.parse(data);
       notes.push(note);
       fs.writeFile(path.join(__dirname, '..', 'db.json'), JSON.stringify(notes), () => {
           res.json(note);
       });
    }));
});

router.delete('/notes/:id', (req, res, next) => {
    fs.readFile(path.join(__dirname, '..', 'db.json'), (err, data) => {
        let notes = JSON.parse(data);
        for (let i = 0; i < notes.length; i++) {
            if (notes[i].id === req.params.id) {
                notes.splice(i,1);
            }
        }
        fs.writeFile(path.join(__dirname, '..', 'db.json'), JSON.stringify(notes), () => {
            res.status(200).json({});
        });
    });
});

module.exports = router;
