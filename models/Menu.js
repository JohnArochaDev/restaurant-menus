const {sequelize} = require('../db');
const { Sequelize, DataTypes } = require('sequelize');

// TODO - create a Menu model

class Menu extends Sequelize.Model {}

Menu.init({
    title: DataTypes.STRING
}, {
    sequelize,
    modelName: 'Menu'
});

module.exports = {Menu};