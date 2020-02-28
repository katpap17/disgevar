const {Sequelize, DataTypes, Model} = require('sequelize');
const {DATABASE_NAME,USERNAME,PASSWORD,HOST,DIALECT} =require('../constants')
const sequelize = new Sequelize(DATABASE_NAME, USERNAME, PASSWORD, {
    host: HOST,
    dialect: DIALECT,
    define: {timestamps: false, freezeTableName: true},
    pool: {
        max: 10,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
});
const Gene = require('./Gene');

const Variant = sequelize.define('Variant', {
    Gene: {type: DataTypes.STRING,
        allowNull: false,
        references: {model: Gene, key: 'GeneSymbol'}
    },
    SNPIdentifier: {type: DataTypes.STRING, primaryKey: true},
    Class: {type: DataTypes.STRING},
    Chromosome: {type: DataTypes.INTEGER},
    VPosition: {type: DataTypes.INTEGER},
    Consequence: {type: DataTypes.STRING},
    Alleles: {type: DataTypes.STRING},
    AFexome: {type: DataTypes.STRING},
    AFgenome: {type: DataTypes.STRING},
    DPI: {type: DataTypes.FLOAT},
    DSI: {type: DataTypes.FLOAT}

});

module.exports = Variant;