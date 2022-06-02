const fs = require('fs');

class Contenedor {
    constructor(nombre) {
        this.title = productos.nombre;
        this.price = productos.price;
        this.thumbnail = productos.thumbnail;
        this.id = productos.id;
    }
}

const productos = [
    {
        "title": "Escuadra",
        "price": 123.45,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/ruler-triangle-stationary-school-256.png",
        "id": 1
    },
    {
        "title": "Calculadora",
        "price": 234.56,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/calculator-math-tool-school-256.png",
        "id": 2
    },
    {
        "title": "Globo Terráqueo",
        "price": 345.67,
        "thumbnail": "https://cdn3.iconfinder.com/data/icons/education-209/64/globe-earth-geograhy-planet-school-256.png",
        "id": 3
    }
];

const createArchive = () => {
    const archivoCreate = fs.createWriteStream('productos.json');
    const archivoTxtCreate = fs.createWriteStream('productos.txt');
    archivoCreate.write(JSON.stringify(productos, 2, 3));
    archivoTxtCreate.write(JSON.stringify(productos, 2, 3));
    return archivoCreate, archivoTxtCreate;
}

const express = require('express');
const multer = require('multer');
const exp = require('constants');
const { createSecretKey } = require('crypto');
const app = express();
const PORT = 8080;

app.listen(PORT, () => {
    console.log(`Introduce en tu navegador :  localhost:${PORT}`);
});

const newProduct = (productos) => {
    const readFile = fs.readFileSync('productos.json', 'utf8');
    const fileParse = JSON.parse(readFile);
    const newProduct = new Contenedor(productos.title, productos.price, productos.thumbnail, productos.id);
    fileParse.push(newProduct);
    const newFile = JSON.stringify(fileParse, 2, 3);
    fs.writeFileSync('productos.json', newFile);
}

app.use(express.urlencoded({ extended: true }));

app.post('/submit-form', (req, res) => {
    const username = req.body.nombre
    const precio = req.body.precio
    const imagen = req.body.imagen
    const id = Math.floor(Math.random() * 1000000);
    const productos = {
        "title": username,
        "price": precio,
        "thumbnail": imagen,
        "id": id
    }
    newProduct(productos);
    res.redirect('/');
});

app.get('/', (req, res) => {
    res.status(200).sendFile(__dirname + '/public/index.html');
});

app.get('/api/productos', (req, res) => {
    const readFile = fs.readFileSync('productos.json', 'utf8');
    const fileParse = JSON.parse(readFile);
    res.status(200).send(fileParse);
});

app.get('/api/productos/:id', (req, res) => {
    const id = req.params.id;
    const readFile = fs.readFileSync('productos.json', 'utf8');
    const fileParse = JSON.parse(readFile);
    const productos = fileParse.filter(producto => producto.id == id);
    res.status(200).send(productos);
});

app.post('/api/productos', (req, res) => {
    const username = "Vino"
    const precio = "400"
    const imagen = "https://cdn.shopify.com/s/files/1/0005/4634/0925/products/DVL-Tinto-2021_2048x2048.jpg?v=1640274188"
    const id = Math.floor(Math.random() * 1000000);
    const productos = {
        "title": username,
        "price": precio,
        "thumbnail": imagen,
        "id": id
    }
    newProduct(productos);
    res.status(200).send(productos);
});

app.put('/api/productos/:id', (req, res) => {
    const id = req.params.id;
    const readFile = fs.readFileSync('productos.json', 'utf8');
    const fileParse = JSON.parse(readFile);
    const productos = fileParse.filter(producto => producto.id == id);
    const newProduct = new Contenedor(req.body.title, req.body.price, req.body.thumbnail, req.body.id);
    const newFile = JSON.stringify(fileParse, 2, 3);
    fs.writeFileSync('productos.json', newFile);
    res.status(200).send(productos);
});

app.delete('/api/productos/:id', (req, res) => {
    const id = req.params.id;
    const readFile = fs.readFileSync('productos.json', 'utf8');
    const fileParse = JSON.parse(readFile);
    const productos = fileParse.filter(producto => producto.id != id);
    const newFile = JSON.stringify(fileParse, 2, 3);
    fs.writeFileSync('productos.json', newFile);
    res.status(200).send(productos);
});