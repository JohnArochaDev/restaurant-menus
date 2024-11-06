const {sequelize} = require('../db');
const { Sequelize, DataTypes } = require('sequelize');

// TODO - create a Menu model

class Item extends Sequelize.Model {}

Item.init({
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    price: DataTypes.INTEGER,
    vegetarian: DataTypes.BOOLEAN,
}, {
    sequelize,
    modelName: 'Item'
});

module.exports = {Item};