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

const Variant = require('./Variant');
const Disease = require('./Disease');


const VarDisAssoc = sequelize.define('VarDisAssoc', {
    Disease: {type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        references: {model: Disease, key: 'UMLSCUI' }
    },
    Variant: {type: DataTypes.STRING,
        primaryKey: true,
        allowNull: false,
        references: {model: Variant, key: 'SNPIdentifier' }
    },
    NPMIDs: {type: DataTypes.INTEGER},
    Score: {type: DataTypes.FLOAT},
    EI: {type: DataTypes.FLOAT},
    FirstRef: {type: DataTypes.INTEGER},
    LastRef: {type: DataTypes.INTEGER}
});
module.exports = VarDisAssoc;