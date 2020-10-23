const router = require('express').Router();
const checkAuth = require('./middleware/checkAuth');
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');
const contactController = require('./controllers/contactController');
const contactSchema = require('./models/contactModel');

router.get('/', function(req, res) {
    res.json({
        status: 'API Works'
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
/*------CONTACT ROUTES-------*/
router.route('/contact')
    .get(contactController.get)
    .put(contactController.update)
    .post(contactController.add)
    .delete(contactController.remove);
router.route('/search')
    .get(contactController.search);

module.exports = router;