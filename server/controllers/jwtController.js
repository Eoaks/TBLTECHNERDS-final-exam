const jwt = require('jwt-simple');

const secret = process.env.SECRET_TOKEN || 'secret';

exports.createToken = function(user) {
    let expDate = new Date();
    expDate.setDate(expDate.getDate() + 7);
    let payload = {
        sub: user._id,
        iat: Date.now(),
        exp: expDate.getTime()
    };
    return jwt.encode(payload, secret);
};

exports.decodeToken = function(token) {
    return jwt.decode(token, secret);
}