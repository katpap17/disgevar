//load bcrypt
var bCrypt = require('bcrypt');
module.exports = function(passport, user) {
    var User = user;
    var LocalStrategy = require('passport-local').Strategy;

    //LOCAL SIGNIN
    passport.use( new LocalStrategy(
        {
            // by default, local strategy uses username and password, we will override with email
            usernameField: 'username',
            passwordField: 'password',
            passReqToCallback: true // allows us to pass back the entire request to the callback


        },

        function(req, username, password, done) {
            var User = user;
            var isValidPassword = function (encryptedPassword, password) {
                if (password == encryptedPassword) {
                    return true;
                }
            };
            //serialize
            passport.serializeUser(function(user, done) {

                done(null, user.Id);

            });
            // deserialize user
            passport.deserializeUser(function(id, done) {

                User.findByPk(id).then(function(user) {

                    if (user) {

                        done(null, user.get());

                    } else {

                        done(user.errors, null);

                    }

                });

            });

            User.findOne({
                where: {
                    role: username
                }
            }).then(function (user) {

                if (!user) {
                    console.log("daskhj");
                    return done(null, false, {
                        message: 'Email does not exist'
                    });

                }

                if (!isValidPassword(user.encryptedPassword, password)) {
                    console.log("oooo");
                    return done(null, false, {
                        message: 'Incorrect password.'
                    });

                }


                var userinfo = user.get();
                return done(null, userinfo);


            }).catch(function (err) {

                console.log("Error:", err);

                return done(null, false, {
                    message: 'Something went wrong with your Signin'
                });

            });
        }))

};
