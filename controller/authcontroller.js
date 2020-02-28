var exports = module.exports = {};

exports.signin = function(req, res) {

    res.render('login');

};

exports.adminPanel = function(req, res) {

    res.render('admin-panel');

};

exports.logout = function(req, res) {

    req.session.destroy(function(err) {

        res.redirect('/signin');

    });

};