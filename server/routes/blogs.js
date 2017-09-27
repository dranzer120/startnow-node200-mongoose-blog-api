const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');
const User = require('../models/User');

router.get('/', (req, res) => {
    Blog
        .find()
        .then(blogs => {
            res.status(200).json(blogs);
        });
});


router.get('/featured', (req, res) => {
    Blog
        .find()
        .where("featured").equals(true)
        .then(blogs => {
            res.status(200).json(blogs);
        })
});

router.get('/:id', (req, res) => {
    Blog
        .findById(req.params.id, function(err,blog){
             if (!blog){
                 res.status(404).send("Could not find blog by ID")
             }
            else{
                res.status(200).json(blog)
            } 
        })
});

router.post('/', (req, res) => {
    var user = req.body;
    user.author = req.query.userId;
        console.log(user)
    var newUser = new Blog (user)
        newUser.save();
        res.status(201).json(newUser);
});

router.put('/:id', (req, res) => {
    Blog
        .findByIdAndUpdate(req.params.id, req.body, function(err,blog){
            console.log(req.params.id)
        });
        res.status(204).json(req.body);
});

router.delete('/:id', (req, res) => {
    Blog
        .findByIdAndRemove(req.params.id, function(err,blog){
            console.log(req.params.id)
        })
        .then(blogs => {
            res.status(200).json(blogs)
        })
});

// var blog1 = new Blog ({
//     title: 'testing',
//     article: 'Hello World',
//     published: "2017-09-26"
// });
// blog1.save()

// Blog.remove({}, function(err,user){
//             console.log(user)
//         });

// Blog.find({ title:'testing'}, function(err,user){
//     console.log(user)
// })

module.exports = router;