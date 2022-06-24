const fs = require('fs');
var express = require('express');
const { useParams } = require('express');
const productos = JSON.parse(fs.readFileSync('../utils/productos.json'));

class Contenedor {
    constructor(nombre) {
        this.title = productos.nombre;
        this.price = productos.price;
        this.thumbnail = productos.thumbnail;
        this.stock = productos.stock;
        this.id = productos.id;
    }
}

const newId = () => {
    let id = 0;
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id > id) {
            id = productos[i].id;
        }
    }
    return id + 1;
}

const createJson = () => {
    let json = JSON.stringify(productos, null, 2);
    fs.writeFileSync('../utils/productos.json', json);
    console.log(json)
}

exports.Contenedor = Contenedor;
exports.newId = newId;
exports.createJson = createJson;
exports.productos = productos;
// exports.editarProducto = editarProducto;
