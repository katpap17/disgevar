var Express = require('express');
var express = Express.Router();
const bodyParser = require('body-parser');
const Variant = require('../models/Variant');
express.use(bodyParser.json());
express.use(bodyParser.urlencoded({extended: true}));
const {Op} = require('sequelize');

//INSERT INTO Variant VALUES(?????)
express.post('/',  (req, res) => {
    Variant.create({
        Gene: req.body.Gene,
        SNPIdentifier: req.body.SNPIdentifier,
        Class: req.body.Class,
        Chromosome: req.body.Chromosome,
        VPosition: req.body.VPosition,
        Consequence: req.body.Consequence,
        Alleles: req.body.Alleles,
        AFexome: req.body.AFexome,
        AFgenome: req.body.AFgenome,
        DPI: req.body.DPI,
        DSI: req.body.DSI
    })
        .then(function(data) {
            res.render('admin-panel', {message: "Variant was updated succesfully!"});
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

//SELECT * FROM Variant
express.get('/', (req, res) => {
    Variant.findAll().then(data => res.render('variants', {result: data}))
        .catch((error) => res.render('error', {error: error, message: 'Oops! An error occurred.'}))
});

//SELECT * FROM Variant WHERE SNPIdentifier = ?
express.get('/:SNPIdentifier?', (req, res) => {
    Variant.findOne({where: {SNPIdentifier: req.params.SNPIdentifier}}).then(data => res.render('variant', {result: data.toJSON()}))
        .catch((error) => res.render('error', {error: error, message: 'Oops! An error occurred.'}))
});

//SELECT * FROM Variant WHERE Gene = ?
express.get('/a/:GeneSymbol?', (req, res) => {
    Variant.findAll({where: {Gene: req.params.GeneSymbol}}).then(data => {
        if(data.length!=0){
            res.render('variants', {result: data})
        }
        else{
            res.render('variants', {message: "hjds"})
        }})
        .catch((error) => res.render('error', {error: error, message: 'Oops! An error occurred.'}))
});

//Select * from gene where GeneSymbol LIKE....
express.get('/search/:SNPIdentifier?', (req, res) => {
    Variant.findAll({
        where: {
            SNPIdentifier: {
                [Op.like] : '%'+req.params.SNPIdentifier+'%'
            }
        }
    })
        .then(data => {
            if(data.length!=0){
                res.render('variants', {
                    result: data})
            }
            else{
                res.render('variants', {message: "no variants were found"})
            }
        })
        .catch((error) => res.render('variants', {message: "no variants were found"}));

});




//DELETE AN ENTRY
express.post('/del', (req, res) =>{
    Variant.destroy({where:{SNPIdentifier: req.body.SNPIdentifier}}) .then(num => {
        if (num == 1) {
            res.render('admin-panel', {
                message: "Variant was deleted successfully!"
            });
        } else {
            res.render('admin-panel', {
                message: `Cannot delete Variant with SNPIdentifier=${req.params.SNPIdentifier}. Maybe Variant was not found!`
            });
        }
    })
        .catch(err => {
            res.render('admin-panel', {
                message: "Could not delete Variant"
            });
        });
});



//UPDATE AN ENTRY
express.post('/upd', (req, res) =>{
    Variant.update(req.body, {where: {SNPIdentifier: req.body.SNPIdentifier}}).then(num => {
        if (num == 1) {
            res.render('admin-panel', {
                message: "Variant was updated successfully."
            });
        } else {
            res.render('admin-panel', {
                message: `Cannot update Variant with SNPIdentifier=${req.params.SNPIdentifier}. Maybe SNPIdentifier was not found or req.body is empty!`
            });
        }
    })
        .catch(err => {
            res.render('admin-panel',{
                message: "Error updating Variant"
            });
        });
});

module.exports = express;
