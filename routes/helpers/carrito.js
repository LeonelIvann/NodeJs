const fs = require('fs');
var express = require('express');
const { useParams } = require('express');
const productos = JSON.parse(fs.readFileSync('./productos.json'));
const carrito = JSON.parse(fs.readFileSync('./carrito.json'));

function deleteCart () {
    carrito.splice(carrito.indexOf(findProd), 1);
}

exports.productos = productos;
exports.carrito = carrito;