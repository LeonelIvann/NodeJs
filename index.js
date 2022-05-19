const fs = require('fs');
const { get } = require('http');

class Contenedor {
    constructor(nombre) {
        this.nombre = nombre;
        this.mascotas = mascotas;
        this.libros = libros;
        this.mensaje = mensaje;
    }
}

const Addlibros = [{
    titulo: 'El libro de la selva',
    autor: 'Robert',
    genero: 'Fantasia',
    id: '1',
}, {
    titulo: 'El Jinete',
    autor: 'Yukimoto',
    genero: 'Conquista',
    id: '2',
}, {
    titulo: 'Al Espacio y al Infinito',
    autor: 'Disney',
    genero: 'Infantil',
    id: '3',
}, {
    titulo: 'El Yugo',
    autor: 'Mao Tzen',
    genero: 'Historia',
    id: '4',
}];
const ClearFile = [{
    mensaje: 'Ya no hay nada más...',
}]

const metodo1 = () => {
    const pickBook = (libro) => {
        return libro.id === '3';
    }
    const libro = Addlibros.find(pickBook);
    fs.writeFileSync('contenedor.json', JSON.stringify(libro, null, 2))
    return "ID del libro " + libro.id;
}

const metodo2 = () => {
    const readFile = fs.readFileSync('contenedor.json');
    const fileInf = JSON.parse(readFile);
    if (fileInf.id === '3') {
        return fileInf;
    } else {
        return null;
    }
}

const metodo3 = () => {
    const readFile = fs.readFileSync('contenedor.json');
    const fileInf = JSON.parse(readFile);
    return fileInf;
}

const metodo4 = () => {
    const readFile = fs.readFileSync('contenedor.json');
    const fileInf = JSON.parse(readFile);
    const removed = delete fileInf[0];
    if (removed === true) {
        fs.writeFileSync('contenedor.json', JSON.stringify(ClearFile, null, 2));
        return "Se sobrescribió el libro por un mensaje";
    } else {
        return "No se pudo eliminar el libro";
    }
}


console.log("Método 1 : ", metodo1(Addlibros));
console.log("Método 2 : ", metodo2(Addlibros));
console.log("Método 3 : ", metodo3(Addlibros));
console.log("Método 4 : ", metodo4(Addlibros));