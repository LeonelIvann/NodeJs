var express = require('express');
var path = require('path');
var productosRoute = express.Router();

const { newId, createJson, productos } = require('./helpers/productos');

class Contenedor {
    constructor(nombre) {
        this.title = productos.nombre;
        this.price = productos.price;
        this.thumbnail = productos.thumbnail;
        this.stock = productos.stock;
        this.id = productos.id;
    }
}

// Me permite listar todos los productos disponibles ó un producto por su id
productosRoute.get('/productos/:id', (req, res) => {
    const { id } = req.params;
    const findProd = productos.find(prod => prod.id == id);
    res.status(200).json(findProd);
});

// Para incorporar productos a la base de datos
productosRoute.post('/productos', (req, res) => {
    productos.push({ ...req.body, id: newId() });
    createJson();
    res.status(200).json(productos);
});

// put para editar un producto
productosRoute.get('/update/:id', (req, res) => {
    const { id } = req.params;
    if (id) {
        const findProd = productos.find(prod => prod.id == id);
        if (findProd) {
            findProd.nombre = req.body.nombre;
            findProd.price = req.body.price;
            findProd.thumbnail = req.body.thumbnail;
            findProd.stock = req.body.stock;
        }
    }
    res.status(200).render('../views/update.ejs', { productos });
});

// delete para eliminar un producto
productosRoute.delete('/productos/:id', (req, res) => {
    const { id } = req.params;
    const findProd = productos.find(prod => prod.id == id);
    productos.splice(productos.indexOf(findProd), 1);
    createJson();
    res.status(200).render('./pages/productos.ejs', { productos });
});

// Inicio
productosRoute.get('/', (req, res) => {
    res.status(200).render('./pages/index.ejs', { productos });
});

// Soporte
productosRoute.get('/support', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/chat.html'));
});

 
module.exports = productosRoute;