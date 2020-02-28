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

const Gene = sequelize.define('Gene', {
        GeneSymbol: {type: DataTypes.STRING, primaryKey: true},
        FullName: {type: DataTypes.STRING},
        EntrezIdentifier: {type: DataTypes.DOUBLE},
        UniprotAccession: {type: DataTypes.STRING},
        DPI: {type: DataTypes.DOUBLE},
        DSI: {type: DataTypes.DOUBLE},
        pLI: {type: DataTypes.STRING},
        NDiseases: {type: DataTypes.DOUBLE}
    }
);


module.exports = Gene;