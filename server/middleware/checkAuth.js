const jwtController = require('../controllers/jwtController');

module.exports = function(req, res, next) {
  if(!req.headers.authorization) {
    return res.status(403).send({message: "not authorized"});
  }
  
  let token = req.headers.authorization.split(" ")[1];
  let payload = jwtController.decodeToken(token);
  
  if(payload.exp <= Date.now()) {
     return res.status(401).send({message: "your session has expired"});
  }
  
  req.userId = payload.sub;
  next();
}