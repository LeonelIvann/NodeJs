const db = require("../db/dbconnection")
const express = require('express');
const app = express();
const PORT = 8080;

(async () => {
    try {
        await db.authenticate();
        await db.sync();
        console.log("Conexion exitosa a la base de datos")
    } catch (error) {
        throw new Error(error + "Error en la conexión")
    }
})();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', './views');
app.set('utils', '../utils')
app.set('view engine', 'ejs');

app.listen(PORT, () => {});

let routeProd = require ('./routes/productosRoute');
let routeCart = require ('./routes/carritoRoute');

app.use('/', routeProd);
app.use('/carrito', routeCart);


app.get('/socket.io/socket.io.js', (req, res) => {
    res.sendFile(__dirname + '/node_modules/socket.io/client-dist/socket.io.js');
});

app.use(express.static('views'));

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { channel } = require('diagnostics_channel');
const Chat = require("../db/models/chat");
const io = new Server(server);

server.listen(3000, () => {
    console.log('listening on *:3000');
});

const usuario = [];
const mensaje = [];

io.on('connection', async (socket) => {

    
    emitir()
    sendUsers()

    socket.on('incomingMessage', message => {
        usuario.indexOf(message.nombre) === -1 ? null : socket.emit("changeName");
        mensaje.push(message);
        usuario.push(message.nombre);
        emitir();
        sendUsers();
    });
});

const emitir = () => io.sockets.emit('chat', mensaje);
const sendUsers = () => io.sockets.emit('usersList', usuario);