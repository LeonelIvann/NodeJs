const fs = require('fs');
var express = require('express');
const { useParams } = require('express');
const productos = [];
const carrito = [];
// const productos = JSON.parse(fs.readFileSync('../utils/productos.json'));
// const carrito = JSON.parse(fs.readFileSync('../utils/carrito.json'));

exports.productos = productos;
exports.carrito = carrito;