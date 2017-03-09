let express = require('express');
let router = express.Router();
let Comment = require('../models/comment');
let Forum = require('../models/forum');

router.get('/', (req, res) => {
    Forum.find().then(result => res.send(result), err => sendStatus(500));
});

router.get('/:id', (req, res) => {
    Forum.findOne({_id: req.params.id}).then(result => res.send(result), err => sendStatus(500));        
});

router.post('/', (req, res) => {
    let post = new Comment(req.body.originalPost);

    post.save().then(result => {

        let thread = new Forum({
            category: req.body.category,
            topic: req.body.topic,
            originalPost: result._id,
            replies: [],
            views: 0,
            date: req.body.date
        });

        thread.save().then(
            () => res.sendStatus(200),
            err => res.sendStatus(500));
            
    } ,err => res.sendStatus(500));

    res.sendStatus(200);
})

router.put('/:id', (req, res) => {
    let reply = new Comment(req.body);

    reply.save().then(() => {
        Forum.findOne({_id: req.params.id}).then(result => {
            result.replies.push(reply._id);
            result.save().then(() => res.sendStatus(200), err => res.sendStatus(500));
        }, err => res.sendStatus(500));
    })
})

module.exports = router;