const fs = require('fs');

class Contenedor {
    constructor(nombre) {
        this.title = title;
        this.price = price;
        this.thumbnail = thumbnail;
        this.id = id;
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
const app = express();
const PORT = 8080;

const allProd = () => {
    const readFile = fs.readFileSync('productos.json', 'utf8', (err, data) => {
        if (err) throw err;
        return data;
    });
    const productos = readFile.split('\n');
    return productos;
}

const radd = (productos) => {
    const readFile = fs.readFileSync('productos.json', 'utf8');
    const fileParse = JSON.parse(readFile);
    const randomParse = Math.floor(Math.random() * fileParse.length);
    const randomProduct = fileParse[randomParse];
    return randomProduct.title + ' ' + randomProduct.price + ' ' + randomProduct.thumbnail + ' ' + randomProduct.id;
}

console.log(radd());

app.get('/', (req, res) => {
    res.send('<h3 style="text-align: center;">Tus dos opciones son, <button><a href="/productos">Productos</a></button> o <button><a href="/productosRandom">Producto Random</a></button></h3>');
});

app.get('/productos', (req, res) => {
    res.send('<h3 style="text-align: center;">Productos</h3> <button><a href="/productosRandom">Producto Random</a></button>  <br> <ul>' + allProd().map(prod => '<p style="font-family: arial;">' + prod + '</p>').join('') + '</ul>');
});
app.get('/productosRandom', (req, res) => {
    res.send('<h3 style="text-align: center;">Producto Random</h3> <button><a href="/productos">Productos</a></button>  <br> ' + radd());
});

app.listen(PORT, () => {
    console.log(`Introduce en tu navegador :  localhost:${PORT}`);
});