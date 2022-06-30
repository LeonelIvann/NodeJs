const fs = require('fs');
var express = require('express');
const { useParams } = require('express');
const productos = [];
// const productos = JSON.parse(fs.readFileSync('../../../productos.json'));

class Contenedor {
    constructor(nombre) {
        this.title = productos.nombre;
        this.price = productos.price;
        this.thumbnail = productos.thumbnail;
        this.stock = productos.stock;
        this.id = productos.id;
        this.updateAt = productos.updateAt;
    }
}



exports.Contenedor = Contenedor;
exports.productos = productos;
// exports.editarProducto = editarProducto;
