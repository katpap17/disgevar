const Express = require('express');
const express = Express.Router();
const bodyParser = require('body-parser');
const Gene = require('../models/Gene');
express.use(bodyParser.json());
express.use(bodyParser.urlencoded({extended: true}));
const {Op} = require('sequelize');


//INSERT INTO Gene VALUES(?????)
express.post('/', (req, res) => {
    for(let i in req.body){
        if(req.body[i] === ''){
            req.body[i]=null;
        }
    }
    Gene.create({
        GeneSymbol: req.body.GeneSymbol,
        FullName: req.body.FullName,
        EntrezIdentifier: req.body.EntrezIdentifier,
        UniprotAccession: req.body.UniprotAccession,
        DPI: req.body.DPI,
        DSI: req.body.DSI,
        pLI: req.body.pLI,
        NDiseases: req.body.NDiseases})
        .then(function(gene) {
            res.render('admin-panel', {message: "Gene was created succesfully!"});
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

//SELECT * FROM Gene
express.get('/', (req, res) => {
    Gene.findAll().then(genes => res.render("genes", {result: genes}))
        .catch((error) => res.render('error', {error: error, message: 'Oops! An error occurred.'}))
});

//SELECT * FROM Gene WHERE genesymbol = ?
express.get('/:GeneSymbol?', (req, res) => {
    Gene.findOne({where: {GeneSymbol: req.params.GeneSymbol}}).then(genes => res.render('gene', {result: genes.toJSON()}))
        .catch((error) => res.render('error', {error: error, message: 'Oops! An error occurred.'}))
});

//Select * from gene where GeneSymbol LIKE....
express.get('/search/:GeneSymbol?', (req, res) => {
    Gene.findAll({
        where: {
            GeneSymbol: {
                [Op.like] : '%'+req.params.GeneSymbol+'%'
            }
        }
    })
        .then(data => {
            if(data.length!=0){
                res.render('genes', {
                    result: data})
            }
            else{
                res.render('genes', {message: "no genes were found"})
            }
        })
        .catch((error) => res.render('genes', {message: "no genes were found"}))
});


//DELETE AN ENTRY
express.post('/del', (req, res) =>{
    Gene.destroy({where:{GeneSymbol: req.body.GeneSymbol}}) .then(num => {
        if (num == 1) {
            res.render('admin-panel', {
                message: "Gene was deleted successfully!"
            });
        } else {
            res.render('admin-panel', {
                message: `Cannot delete Gene with GeneSymbol=${req.body.GeneSymbol}. Maybe Gene was not found!`
            });
        }
    })
        .catch(err => {
            res.render('admin-panel', {
                message: "Could not delete Gene with GeneSymbol=" + req.body.GeneSymbol
            });
        });
});



//UPDATE AN ENTRY
express.post('/upd',  (req, res) =>{
    for(let i in req.body){
        if(req.body[i] === ''){
            delete req.body[i];
        }
    }
    Gene.update(req.body, {where: {GeneSymbol: req.body.GeneSymbol}}).then(num => {
        if (num == 1) {
            res.render('admin-panel', {
                message: "Gene was updated successfully."
            });
        } else {
            res.render('admin-panel', {
                message: `Cannot update Gene with GeneSymbol=${req.body.GeneSymbol}. Maybe GeneSymbol was not found or req.body is empty!`
            });
        }
    })
        .catch(err => {
            res.render('admin-panel', {
                message: "Error updating Gene with GeneSymbol=" + req.body.GeneSymbol
            });
        });
});



module.exports = express;
