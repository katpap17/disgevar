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

const User = sequelize.define('User', {
        Id: {type: DataTypes.INTEGER, primaryKey: true},
        role: {type: DataTypes.STRING, enum: ['admin', 'restricted'], required: true},
        encryptedPassword: {type: DataTypes.STRING, required: true}
    }

);



module.exports = User;