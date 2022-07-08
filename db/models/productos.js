const { DataTypes } = require("sequelize");
const db = require("../dbconnection");

const Productos = db.define('productos', {
    titulo: {
        type: DataTypes.STRING,
    },
    precio: {
        type: DataTypes.FLOAT,
    },
    stock: {
        type: DataTypes.STRING,
    },
    thumbnail: {
        type: DataTypes.STRING,
    }
})

module.exports = Productos