var Express = require('express');
var express = Express.Router();
const bodyParser = require('body-parser');
const GeneDisAssoc = require('../models/GeneDisAssoc');
express.use(bodyParser.json());
express.use(bodyParser.urlencoded({extended: true}));
const {Op} = require('sequelize');

//INSERT INTO GeneDisAssoc VALUES(?????)
express.post('/',  (req, res) => {
    GeneDisAssoc.create({
        Disease: req.body.Disease,
        Gene: req.body.Gene,
        NSNPs: req.body.NSNPs,
        NPMIDs: req.body.NPMIDs,
        Score: req.body.Score,
        EL: req.body.EL,
        EI: req.body.EI,
        FirstRef: req.body.FirstRef,
        LastRef: req.body.LastRef
    })
        .then(function (data) {
            // you can now access the newly created user
            res.render('admin-panel', {message: 'Gene-Disease Association was created succesfully!'});
        })
        .catch(err =>
        {
            // print the error details
            res.status(500).send({
                message:
                    err.message || "erroooooooor"
            });
        });
});

//SELECT * FROM GeneDisAssoc
express.get('/', (req, res) => {
    GeneDisAssoc.findAll().then(data => res.json(data))
});

//SELECT * FROM GeneDisAssoc WHERE Disease = ?
express.get('/:Disease?', (req, res) => {
    GeneDisAssoc.findAll({where: {Disease: req.params.Disease}}).then(data => res.render('genedisassoc', {result: data}))
});

//SELECT * FROM GeneDisAssoc WHERE Gene = ?
express.get('/a/:Gene?', (req, res) => {
    GeneDisAssoc.findAll({where: {Gene: req.params.Gene}}).then(data => res.render('genedisassoc', {result: data}))
});

//DELETE AN ENTRY
express.post('/del', (req, res) => {
    GeneDisAssoc.destroy({
        where: {
            [Op.and]: [
                {Disease: req.body.Disease},
                {Gene: req.body.Gene}
            ]
        }
    })
        .then(num => {
            if (num == 1) {
                res.render('admin-panel', {
                    message: "GeneDisAssoc was deleted successfully!"
                });
            } else {
                res.render('admin-panel', {
                    message: `Cannot delete GeneDisAssoc. Maybe GeneDisAssoc was not found!`
                });
            }
        })
        .catch(err => {
            res.render('admin-panel', {
                message: "Could not delete GeneDisAssoc"
            });
        });
});

//UPDATE AN ENTRY
express.post('/upd', (req, res) => {
    GeneDisAssoc.update(req.body, {where: {
            [Op.and]: [
                {Disease: req.body.Disease},
                {Gene: req.body.Gene}
            ]
        }}).then(num => {
        if (num == 1) {
            res.render('admin-panel', {
                message: "GeneDisAssoc was updated successfully."
            });
        } else {
            res.render('admin-panel', {
                message: `Cannot update GeneDisAssoc. Maybe GeneDisAssoc was not found or req.body is empty!`
            });
        }
    })
        .catch(err => {
            res.render('admin-panel', {
                message: "Error updating GeneDisAssoc"
            });
        });
});



module.exports = express;