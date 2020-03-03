var Express = require('express');
var express = Express.Router();
const bodyParser = require('body-parser');
const VarDisAssoc = require('../models/VarDisAssoc');
express.use(bodyParser.json());
express.use(bodyParser.urlencoded({extended: true}));
const {Op} = require('sequelize');

//INSERT INTO VarDisAssoc VALUES(?????)
express.post('/', (req, res) => {
    for(let i in req.body){
        if(req.body[i] === ''){
            req.body[i]=null;
        }
    }
    VarDisAssoc.create({
        Disease: req.body.Disease,
        Variant: req.body.Variant,
        NPMIDs: req.body.NPMIDs,
        Score: req.body.Score,
        EI: req.body.EI,
        FirstRef: req.body.FirstRef,
        LastRef: req.body.LastRef
    })
        .then(function (data) {

            res.render('admin-panel', {message: "Variant Disease Association was created succesfully!"});
        })
        .catch(err =>
        {
            // print the error details
            res.render('admin-panel', {
                message:
                    err.message || "erroooooooor"
            });
        });
});

//SELECT * FROM VarDisAssoc
express.get('/', (req, res) => {
    VarDisAssoc.findAll().then(data => res.json(data))
});

//SELECT * FROM VarDisAssoc WHERE Disease = ?
express.get('/:Disease?', (req, res) => {
    VarDisAssoc.findAll({where: {Disease: req.params.Disease}}).then(data => {
        if(data.length!=0){
            res.render('vardisassoc', {result: data})
        }
        else{
            res.render('vardisassoc', {message: "lkdjas"})
        }
    })
});

//SELECT * FROM VarDisAssoc WHERE Gene = ?
express.get('/a/:Variant?', (req, res) => {
    VarDisAssoc.findAll({where: {Variant: req.params.Variant}}).then(data => {
        if(data.length!=0){
            res.render('vardisassoc', {result: data})
        }
        else{
            res.render('vardisassoc', {message: "lkdjas"})
        }
    })
});

//DELETE AN ENTRY
express.post('/del',  (req, res) => {
    VarDisAssoc.destroy({
        where: {
            [Op.and]: [
                {Disease: req.body.Disease},
                {Variant: req.body.Variant}
            ]
        }
    })
        .then(num => {
            if (num == 1) {
                res.render('admin-panel',{
                    message: "VarDisAssoc was deleted successfully!"
                });
            } else {
                res.send({
                    message: `Cannot delete VarDisAssoc. Maybe VarDisAssoc was not found!`
                });
            }
        })
        .catch(err => {
            res.render('admin-panel', {
                message: "Could not delete VarDisAssoc"
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
    VarDisAssoc.update(req.body, {where: {
            [Op.and]: [
                {Disease: req.body.Disease},
                {Variant: req.body.Variant}
            ]
        }}).then(num => {
        if (num == 1) {
            res.render('admin-panel', {
                message: "VarDisAssoc was updated successfully."
            });
        } else {
            res.render('admin-panel', {
                message: `Cannot update VarDisAssoc. Maybe VarDisAssoc was not found or req.body is empty!`
            });
        }
    })
        .catch(err => {
            res.render('admin-panel', {
                message: "Error updating VarDisAssoc"
            });
        });
});



module.exports = express;
