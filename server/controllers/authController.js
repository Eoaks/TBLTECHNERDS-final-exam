const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwtController = require('./jwtController');

exports.register = function(req, res) {
    User.findOne({email: req.body.email.toLowerCase()}, (err, user) => {
        if(user) {
            res.render('register', {error: 'email taken'})
        }
    })
    let user = new User({
        email: req.body.email
    });
    user.password = user.generateHash(req.body.password);
    user.contacts = [];
    user.save(function(err){
        if(err) {
            console.log(err);
            return;
        }
        res.cookie('token', 'Bearer ' + jwtController.createToken(user), {httpOnly: true});
        res.cookie('loggedIn', 'true');
        return res.redirect(302, '/');
    });
};

exports.login = function(req, res) {
    User.findOne({email: req.body.email.toLowerCase()}, function(err, user) {
        if(err) {
            console.log(err);
        }
        if(user) {
            if(user.checkPassword(req.body.password)) {
                res.cookie('token', 'Bearer ' + jwtController.createToken(user), {httpOnly: true})
                res.cookie('loggedIn', 'true')
                return res.redirect(302, '/');
            }
            return res.status(400).render('login', {error: 'wrong password'});
        } else {
            return res.status(400).render('login', {error: 'user not found'});
        }
    });
};
exports.logout = function(req, res) {
   res.cookie('token', '');
   res.cookie('loggedIn', 'false');
   res.redirect(302, '/');
};