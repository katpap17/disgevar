var authController = require('../controller/authcontroller.js');


module.exports = function(app, passport) {

    app.get('/signin', authController.signin);

    app.post('/signin', passport.authenticate('local', {
            successRedirect: '/adminpanel',

            failureRedirect: '/signin'

        }
    )
    );

    app.get('/adminPanel',isLoggedIn, authController.adminPanel);

    app.get('/logout',authController.logout);

    function isLoggedIn(req, res, next) {

        if (req.isAuthenticated())

            return next();

        res.redirect('/signin');

    }
};


