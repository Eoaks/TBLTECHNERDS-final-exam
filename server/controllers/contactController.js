const mongoose = require('mongoose');
const User = mongoose.model('User');

exports.add = function (req, res) {
    User.findById(req.userId, (err, user) => {
        if (err) {
            console.log(err)
        }
        user.contacts.push({
            firstName: req.body.firstName,
            lastName:req.body.lastName,
            email: req.body.email,
            phone: req.body.phone
        });
        user.save((err) => {
            if(err) {
                res.status(400).json(err);
            }
            res.status(201).json(user.contacts[user.contacts.length - 1]);
        });
    });
}
exports.get = function (req, res) {
    User.findById(req.userId, (err, user) => {
        if (err) {
            console.log(err)
        }
        
        let limit = 10;
        let { page = 1 } = req.body;
        let offset = limit * page;

        let resultArray = user.contacts.sort( (a,b) => {
            if (a.firstName > b.firstName) {
                return 1;
            }
            if (a.firstName < b.firstName) {
            return -1;
            }
            return 0;
        })

        res.status(200).send(resultArray.slice(offset - limit, offset));
    });
}
exports.search = function (req, res) {
    User.findById(req.userId, (err, user) => {
        if (err) {
            console.log(err)
        }
        let searchResult = user.contacts.filter(contact => {
            console.log(contact)
            return contact.firstName.trim().toLowerCase().includes(req.body.search.trim().toLowerCase())
        })
        res.status(200).send(searchResult);
    });
}
exports.update = function(req, res) {
    User.findById(req.userId, (err, user) => {
        if (err) {
            console.log(err)
        }
        //it's hard to edit an object inside an array, delete it instead and push a new one
        user.contacts.id(req.body.id).remove();
        user.contacts.push({
            firstName: req.body.firstName,
            lastName:req.body.lastName,
            email: req.body.email,
            phone: req.body.phone
        });
        
        user.save((err) => {
            if(err) {
                res.status(400).json(err);
            }
            res.status(200).json({message: 'success'})
        });
    });
}
exports.remove = function(req, res) {
    User.findById(req.userId, (err, user) => {
        if (err) {
            console.log(err)
        }
        user.contacts.id(req.body.id).remove();
        user.save((err) => {
            if(err) {
                res.status(400).json(err);
            }
            res.status(200).json({message: 'sucess'})
        });
    });
}