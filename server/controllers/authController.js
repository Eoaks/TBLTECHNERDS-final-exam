const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwtController = require('./jwtController');

exports.register = function(req, res) {
    let user = new User({
        email: req.body.email
    });
    user.password = user.generateHash(req.body.password);
    
    user.save(function(err){
        if(err) {
            console.log(err);
        }
        return res
            .status(200)
            .json({token: jwtController.createToken(user)});
    });
};

exports.login = function(req, res) {
    User.findOne({email: req.body.email.toLowerCase()}, function(err, user) {
        if(err) {
            console.log(err);
        }
        if(user) {
            if(user.checkPassword(req.body.password)) {
                console.log('checked')
                return res.status(200).json({token: jwtController.createToken(user)});
            }
            return res.status(400).json({message: 'wrong password'});
        } else {
            return res.status(400).json({message: 'user not found'});
        }
    });
};