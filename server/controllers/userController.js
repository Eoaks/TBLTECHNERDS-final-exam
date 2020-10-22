User = require('../models/userModel');

exports.getUserData = function(req, res) {
    User.findById(req.userId, (err, user) => {
        res.json(user);
    });
}