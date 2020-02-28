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
const Disease = require('./Disease');

const GeneDisAssoc = sequelize.define('GeneDisAssoc', {
    Disease: {type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        references: {model: Disease, key: 'UMLSCUI' }
    },
    Gene: {type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        references: {model: Gene, key: 'GeneSymbol' }
    },
    NSNPs: {type: DataTypes.INTEGER},
    NPMIDs: {type: DataTypes.INTEGER},
    Score: {type: DataTypes.FLOAT},
    EL: {type: DataTypes.STRING},
    EI: {type: DataTypes.FLOAT},
    FirstRef: {type: DataTypes.INTEGER},
    LastRef: {type: DataTypes.INTEGER}
});

module.exports = GeneDisAssoc;