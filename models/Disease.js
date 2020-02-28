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

const Disease = sequelize.define('Disease', {
    DName: {type: DataTypes.STRING},
    UMLSCUI: {type: DataTypes.STRING, primaryKey: true},
    MeSH: {type: DataTypes.STRING},
    SemanticType: {type: DataTypes.STRING},
    PhenAbn: {type: DataTypes.STRING},
    DType: {type: DataTypes.STRING},
    NGenes: {type: DataTypes.INTEGER},
    NSnps: {type: DataTypes.INTEGER}
    }
    );

module.exports = Disease;
