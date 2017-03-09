let express = require('express');
let router = express.Router();
let Profile = require('../models/profile');

//GET requests
router.get('/', (req, res) => {
    Profile.find().then(result => {
        res.send(result);
    });
});

router.get('/:id', (req, res) => {
    Profile.findOne({_id: req.params.id}).then(result => {
        if(result === null) {
            res.sendStatus(404);
        }
        else {
            res.send(result);
        }
    }, err => res.sendStatus(500))
});

router.get('/name/:name', (req, res) => {
    console.log(req.params.name)
    Profile.find({name: {$regex: req.params.name, $options: 'i'}})
        .then(result => res.send(result), err => res.sendStatus(500));
})

//POST requests
router.post('/', (req, res) => {
    if(req.body.name === (null || '')) {
        res.sendStatus(500)    
    }
    else{
        let profile = new Profile({name: req.body.name});

        profile.save().then(result => res.sendStatus(200), err => res.sendStatus(500));
    }
})

//PUT requests
router.put('/:id', (req, res) => {
    if(req.params.id !== req.body._id) {
        res.sendStatus(500);
    }
    else {
        Profile.findOneAndUpdate({_id: req.body._id}, req.body).then(result => {
            res.sendStatus(200);
        }, err => sendStatus(500));
    }
})

module.exports = router;