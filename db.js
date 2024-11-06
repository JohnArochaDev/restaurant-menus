const path = require('path');
const { Sequelize, DataTypes } = require('sequelize');

// TODO - connect to db via sequelize

const sequelize = new Sequelize({
    dialect: 'sqlite'
  });

module.exports = {
    sequelize
};
