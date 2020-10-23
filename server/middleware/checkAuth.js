const jwtController = require('../controllers/jwtController');

module.exports = function(req, res, next) {
  if(!req.cookies.token) {
    return res.redirect(302, '.');
  }
  
  let token = req.cookies.token.split(" ")[1];
  let payload = jwtController.decodeToken(token);
  
  if(payload.exp <= Date.now()) {
     return res.status(401).send({message: "your session has expired"});
  }
  
  req.userId = payload.sub;
  next();
}