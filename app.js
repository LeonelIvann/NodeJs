const fs = require('fs');

const productos = JSON.parse(fs.readFileSync('./views/productos.json'));

class Contenedor {
    constructor(nombre) {
        this.title = productos.nombre;
        this.price = productos.price;
        this.thumbnail = productos.thumbnail;
        this.id = productos.id;
    }
}

const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', './views');
app.set('view engine', 'ejs');

app.listen(PORT, () => {});

const newId = () => {
    let id = 0;
    for (let i = 0; i < productos.length; i++) {
        if (productos[i].id > id) {
            id = productos[i].id;
        }
    }
    return id + 1;
    console.log(id);
}

const createJson = () => {
    let json = JSON.stringify(productos, null, 2);
    fs.writeFileSync('./productos.json', json);
}

app.get('/socket.io/socket.io.js', (req, res) => {
    res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js');
});

app.use(express.static('views'));

app.get('/', (req, res) => {
    res.status(200).render('pages/index.ejs', { productos });
});

app.get('/productos', (req, res) => {
    res.status(200).render('pages/productos.ejs', { productos });
});

app.post('/productos', (req, res) => {
    productos.push({ ...req.body, id: newId() });
    createJson();
    res.status(200).render('pages/productos.ejs', { productos });
});

app.get('/support', (req, res) => {
    res.sendFile(__dirname + '/views/chat.html');
});

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { channel } = require('diagnostics_channel');
const io = new Server(server);

server.listen(3000, () => {
    console.log('listening on *:3000');
});

let chat = []; // array de mensajes
let users = [];	// Lista de usuarios

io.on('connection', (socket) => {
    
    emitir()
    sendUsers()

    socket.on('incomingMessage', message => {
        users.indexOf(message.nombre) === -1 ? null : socket.emit("changeName");
        chat.push(message);
        users.push(message.nombre);
        emitir();
        sendUsers();
    });
});

const emitir = () => io.sockets.emit('chat', chat);
const sendUsers = () => io.sockets.emit('usersList', users);