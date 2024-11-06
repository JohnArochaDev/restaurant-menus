const {sequelize} = require('../db');
const { Sequelize, DataTypes} = require('sequelize');

// TODO - create a Restaurant model

class Restaurant extends Sequelize.Model {}

Restaurant.init({
    name: DataTypes.STRING,
    location: DataTypes.STRING,
    cuisine: DataTypes.STRING
}, {
    sequelize,
    modelName: 'Restaurant'
});

module.exports = {Restaurant};