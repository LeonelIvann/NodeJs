var express = require('express');
const { useParams, json } = require('express');
var carritoRoute = express.Router();

const { productos, carrito} = require('./helpers/carrito');

// a. POST: '/' - Crea un carrito y devuelve su id.
carritoRoute.get('/', (req, res) => {
    res.status(200).render('./pages/carrito.ejs', { carrito });
});
// b. DELETE: '/:id' - Vacía un carrito y lo elimina.
carritoRoute.delete('/:id', (req, res) => {
    carrito.pop();
    res.status(200).render('./pages/carrito.ejs', {carrito});
});
// c. GET: '/:id/productos' - Me permite listar todos los productos guardados en el carrito
carritoRoute.get('/:id/productos', (req, res) => {
    res.status(200).render('./pages/carrito.ejs', { carrito });
});
// d. POST: '/:id/productos' - Para incorporar productos al carrito por su id de producto
carritoRoute.post('/:id/productos', (req, res) => {
    const { id } = req.params;
    const findProd = productos.find(prod => prod.id == id);
    carrito.push(findProd);
    res.status(200).render('./pages/carrito.ejs', { carrito });
});
// e. DELETE: '/productos/:id_prod' - Eliminar un producto del carrito por su id de carrito y de producto
carritoRoute.delete('/productos/:id_prod', (req, res) => {
    const { id } = req.params;
    const findProd = carrito.find(prod => prod.id == id);
    carrito.splice(carrito.indexOf(findProd), 1);
    productos.splice(productos.indexOf(findProd), 1);
    console.log(findProd)
    res.status(200).render('./pages/carrito.ejs', { carrito });
});
 
module.exports = carritoRoute;