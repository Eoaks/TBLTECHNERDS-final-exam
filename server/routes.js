const router = require('express').Router();
const checkAuth = require('./middleware/checkAuth');
const userController = require('./controllers/userController');
const authController = require('./controllers/authController');
const contactController = require('./controllers/contactController');
const contactSchema = require('./models/contactModel');



/************************
***** PUBLIC ROUTES *****
*************************/

router.get('/', (req, res) => {
    if(!req.cookies.token){
        res.render('login')
    } else {
        res.redirect('/contact')
    }
})

router.get('/new-contact', (req, res) => {
    res.render('newContact');
})


/*----AUTH ROUTES-----*/
router.route('/register')
    .get((req, res) => {
        res.render('register');
    })
    .post(authController.register);
router.route('/login')
    .post(authController.login);
router.route('/logout')
    .get(authController.logout);   

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
    .post(contactController.add);
router.route('/update-contact')
    .post(contactController.update);
router.route('/delete-contact')
    .post(contactController.remove);
    
router.route('/search')
    .get(contactController.search);

module.exports = router;