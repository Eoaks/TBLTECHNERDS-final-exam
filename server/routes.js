const router = require('express').Router();
const checkAuth = require('./middleware/checkAuth');
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');

router.get('/', function(req, res) {
    res.json({
        status: 'API Works',
        message: 'Welcome to FirstRest API'
    });
});

/************************
***** PUBLIC ROUTES *****
*************************/

/*----AUTH ROUTES-----*/
router.route('/register')
    .post(authController.register);
router.route('/login')
    .post(authController.login);    

/************************
*** PROTECTED ROUTES  ***
*************************/

router.use(checkAuth);

/*------USER ROUTES-------*/
router.route('/user')
    .get(userController.getUserData);

module.exports = router;