const fs = require('fs');

class Contenedor {
    constructor(nombre) {
        this.title = productos.nombre;
        this.price = productos.price;
        this.thumbnail = productos.thumbnail;
        this.id = productos.id;
    }
}

const productos = [];

const express = require('express');
const app = express();
const PORT = 8080;


app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', './views');
app.set('view engine', 'ejs');

app.listen(PORT, () => {
    console.log(`Introduce en tu navegador :  localhost:${PORT}`);
});

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
    fs.writeFileSync('./productos.json', json);
}

app.get('/', (req, res) => {
    res.status(200).render('pages/index.ejs', {productos});
});

app.get('/productos', (req, res) => {
    res.status(200).render('pages/productos.ejs', {productos});
});

app.post('/productos', (req, res) => {
    productos.push({...req.body, id: newId()});
    res.status(200).render('pages/productos.ejs', {productos});
});