const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.get('/', (req, res) => {
    User
        .find()
        .then(users => {
            res.status(200).json(users);
        });
});

router.get('/:id', (req, res) => {
    User
        .findById(req.params.id, function(err,user){
            if (!user){
                 res.status(404).send("Could not find user by ID")
             }
            else{
                res.status(200).json(user)
            } 
        })
});

router.post('/', (req, res) => {
    var temp = new User (req.body);
        temp.save();
        res.status(201).json(temp);
});

router.put('/:id', (req, res) => {
    User
        .findByIdAndUpdate(req.params.id, req.body, function(err,user){
            console.log(req.params.id)
        });
        res.status(204).json(req.body);
});

router.delete('/:id', (req, res) => {
    User
        .findByIdAndRemove(req.params.id, function(err,user){
            if (err){
                res.send(404).json(err)
            }
            else if (!user){
                res.json('cannot find user')
            }
            else{
                res.json(user)
            }
        })
});


// var user1 = new User ({
//     firstName: '1',
//     lastName: '1-Last',
//     email: '1@email'
// });

// user1.save()

// var user2 = new User ({
//     firstName: '2',
//     lastName: '2-Last',
//     email:'2@email'
// });

// user2.save()

// var user3 = new User ({
//     firstName: '3',
//     social:{
//         facebook: '3-facebook'
//     },
//     lastName: '3-Last',
//     email: '3@email'
// });

// user3.save()

// User.findByIdAndUpdate("59cac9b17c035197f448780d", {firstName:'3.1'}, function(err, user) {
//   console.log(user); 
// });

module.exports = router;