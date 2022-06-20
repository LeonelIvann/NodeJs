var express = require('express');
const { useParams } = require('express');
var carritoRoute = express.Router();

const { productos, carrito } = require('./helpers/carrito');


carritoRoute.get('/', (req, res) => {
    res.status(200).render('./pages/carrito.ejs', { carrito });
});

// carritoRoute.post('/carrito/', (req, res) => {
//     res.status(200).render('./pages/productos.ejs',);
// });

// carritoRoute.delete('/:id/productos', (req, res) => {
//     res.status(200).render('./pages/productos.ejs',);
// });

carritoRoute.post('/:id/productos', (req, res) => {
    const { id } = req.params;
    const findProd = productos.find(prod => prod.id == id);
    const suma = carrito.reduce((acc, curr) => acc + curr.precio, 0);
    carrito.push(findProd);

    res.status(200).render('./pages/carrito.ejs', { carrito, suma });
    // res.status(200).render('./pages/carrito.ejs', { findProd });
});

// carritoRoute.get('/:id/productos', (req, res) => {
//     res.status(200).render('./pages/carrito.ejs', { carrito });
// });

carritoRoute.delete('/productos/:id.delete', (req, res) => {

    document.getElementById("removeBtn").addEventListener("click", function(){
        
    })

    const { id } = req.params;
    const findProd = carrito.find(prod => prod.id == id);
    carrito.splice(carrito.indexOf(findProd), 1);
    res.status(200).render('./pages/carrito.ejs', { carrito });
});
 
module.exports = carritoRoute;