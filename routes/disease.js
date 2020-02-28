    var Express = require('express');
    var express = Express.Router();
    const bodyParser = require('body-parser');
    const Disease = require('../models/Disease');
    express.use(bodyParser.json());
    express.use(bodyParser.urlencoded({extended: true}));
    const {Op} = require("sequelize");

    //INSERT INTO DISEASE VALUES(?????)
    express.post('/', (req, res) => {
     const dis=0;
        for(let i in req.body){
            if(req.body[i] === ''){
                req.body[i]=null;
            }
        }
     console.log(req.body);
     Disease.create({
         DName: req.body.DName,
         UMLSCUI: req.body.UMLSCUI,
         MeSH: req.body.MeSH,
         SemanticType: req.body.SemanticType,
         PhenAbn: req.body.PhenAbn,
         DType: req.body.DType,
         NGenes: req.body.NGenes,
         NSNPs: req.body.NSNPs
     })
        .then(function (data) {
            // you can now access the newly created user
            res.render('admin-panel', {message: "Disease created succesfully!"})
        })
        .catch(err =>
        {
            // print the error details
            res.render('admin-panel', {message: err})
        });
        });

//SELECT * FROM DISEASE
express.get('/', (req, res) => {
    Disease.findAll().then(diseases => res.render('diseases', {
        result: diseases})).catch((error) => res.render('error', {error: error, message: 'Opps! An error occured.'}))
});

//Select * from disease where DName LIKE....
express.get('/search/:DName?', (req, res) => {
    Disease.findAll({
        where: {
            DName: {
                [Op.like] : '%'+req.params.DName+'%'
            }
        }
    })
        .then(diseases => {
            if(diseases.length!=0){
            res.render('diseases', {
                result: diseases})}
            else{
                res.render('diseases', {message: "No disease was found"})
            }
        })
        .catch((error) => res.render('diseases', {message: "No disease was found"}))
});



//SELECT * FROM DISEASE WHERE UMLSCUI = ?
express.get('/:UMLSCUI?', (req, res) => {
    Disease.findOne({where: {UMLSCUI: req.params.UMLSCUI}}).then(diseases => res.render('disease', {
        result: diseases.toJSON()
    })).catch((error) => res.render('error', {error: error, message: 'Oops! An error occurred.'}))
});

//DELETE AN ENTRY
express.post('/del',  (req, res) => {
    Disease.destroy({where: {UMLSCUI: req.body.UMLSCUI}})
        .then(num => {
            if (num == 1) {
                res.render('admin-panel', {
                    message: "Disease was deleted successfully!"
                });
            } else {
                res.render('admin-panel', {
                    message: `Cannot delete Disease with UMLSCUI=${req.params.UMLSCUI}. Maybe Disease was not found!`
                });
            }
        })
        .catch(err => {
            res.render('admin-panel', {
                message: "Could not delete Disease with UMLSCUI=" + req.params.UMLSCUI
            });
        });
});

//UPDATE AN ENTRY
express.post('/upd', (req, res) => {
    for(let i in req.body){
        if(req.body[i] === ''){
            delete req.body[i];
        }
    }
    Disease.update(req.body, {where: {UMLSCUI: req.body.UMLSCUI}}).then(num => {
        if (num == 1) {
            res.render('admin-panel', {
                message: "Disease was updated successfully."
            });
        } else {
            res.render('admin-panel', {
                message: `Cannot update Disease with UMLSCUI=${req.body.UMLSCUI}. Maybe UMLSCUI was not found or req.body is empty!`
            });
        }
    })
        .catch(err => {
            res.render('admin-panel', {
                message: "Error updating Disease with UMLSCUI=" + req.body.UMLSCUI+ req.body.MeSH
            });
        });
});

module.exports = express;
