var express = require('express');
var path = require('path');
const Productos = require('../../db/models/productos');
var productosRoute = express.Router();

const { newId, createJson } = require('./helpers/productos');

// class Contenedor {
//     constructor(nombre) {
//         this.title = productos.nombre;
//         this.price = productos.price;
//         this.thumbnail = productos.thumbnail;
//         this.stock = productos.stock;
//         this.id = productos.id;
//     }
// }

// GET: '/:id?' - Me permite listar todos los productos disponibles ó un producto por su id 
productosRoute.get('/productos/:id', (req, res) => {
    const { id } = req.params;
    const findProd = productos.find(prod => prod.id == id);
    res.status(200).json(findProd);
});

// POST: '/' - Para incorporar productos al listado (disponible para administradores)
productosRoute.post('/productos', async(req, res) => {
    Productos.create({
        title:    req.body.title, // <-- THIS IS MORE VERBOSE BUT PROBABLY SAFER?
        price: req.body.price,
        stock:       req.body.stock,
        thumbnail: req.body.thumbnail,
        id: newId(),
      })
      
    const producd = await Productos.findAll();
        res.status(200).json(producd)
    })
//     const dbProd = await Productos.create({...req.body, id: newId()})
//     res.status(200).json(dbProd);
// });

// PUT: '/:id' - Actualiza un producto por su id (disponible para administradores)
// productosRoute.get('/update/:id', (req, res) => {
//     const { id } = req.params; 
//     productos.splice({ ... req.body }.indexOf(id), 1);
//     res.status(200).render('../views/update.ejs', { productos });
// });

// DELETE: '/:id' - Borra un producto por su id (disponible para administradores)
productosRoute.delete('/productos/:id', (req, res) => {
        const { id } = req.params;
        const findProd = productos.find(prod => prod.id == id);
        productos.splice(productos.indexOf(findProd), 1);
        createJson();
        console.log(req.params) 
    res.status(200).render('./pages/productos.ejs', { productos });
});

// Inicio
productosRoute.get('/', async (req, res) => {
    const producd = await Productos.findAll();
    res.status(200).render('./pages/index.ejs', { producd });
});

// Soporte
productosRoute.get('/support', (req, res) => {
    res.sendFile(path.join(__dirname, '../views/chat.html'));
});

 
module.exports = productosRoute;