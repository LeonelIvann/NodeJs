let { chat } = require("./arrays/chat");
let { users } = require("./arrays/users");

const express = require('express');
const app = express();
const PORT = 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.set('views', './views');
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
const io = new Server(server);

server.listen(3000, () => {
    console.log('listening on *:3000');
});

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