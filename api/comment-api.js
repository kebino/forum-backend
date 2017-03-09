let express = require('express');
let router = express.Router();
let Comment = require('../models/comment');
let Profile = require('../models/profile');

const idFieldNameToPopulate = 'commentedBy';

router.get('/', (req, res) => {
    Comment.find()
        .populate(idFieldNameToPopulate)
        .then(result => res.send(result), err => res.sendStatus(500));
});

router.get('/:id', (req, res) => {
    Comment.findOne({_id: req.params.id})
        .populate(idFieldNameToPopulate)
        .then(result => {
            if(result == null) {
                res.sendStatus(404);
                return;
            }
            res.send(result)
        }, err => res.sendStatus(500));
});

router.get('/list/:ids', (req, res) => {
    let ids = JSON.parse(req.params.ids);
    
    Comment.find({_id: {'$in': ids}})
        .populate(idFieldNameToPopulate)
        .then(result => res.send(result), err => res.sendStatus(500));
});

router.put('/like/:id', (req, res) => {
    Comment.findOneAndUpdate({_id: req.params.id}, {$inc:{likes: 1}})
        .then(() => res.sendStatus(200), err => res.sendStatus(500));
});

module.exports = router;