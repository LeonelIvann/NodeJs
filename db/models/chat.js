const { DataTypes } = require("sequelize");
const db = require("../dbconnection");

const Chat = db.define('soporte chat', {
    usuario: {
        type: DataTypes.STRING,
    },
    mensaje: {
        type: DataTypes.STRING,
    }
})

module.exports = Chat