const { Sequelize } = require('sequelize');

const db = new Sequelize('base_de_datos', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});


module.exports = db