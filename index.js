class Usuario {
    constructor(nombre, apellido, libro, mascotas) {
        this.nombre = nombre;
        this.apellido = apellido
        this.libro = libro;
        this.mascotas = mascotas;
    }
}

const datos = [{
    nombre: 'Roberto',
    apellido: 'Gomez',
    libro: [{
            titulo: 'El libro de la selva',
            autor: 'Robert',
            genero: 'Fantasia',
    }, {    
            titulo: 'El Rocinante',
            autor: 'Space X',
            genero: 'Fantasia',
            }],
    mascotas: ['Perro', 'Pez'],
}];

const getFullName = (usuario) => {
    const nombre = datos[0].nombre;
    const apellido = datos[0].apellido;
    return `${"Nombre : " + nombre} ${apellido}`;
}

const addMascota = (usuario) => {
    const mascota = datos[0].mascotas;
    return `${"Mascotas : " + mascota[0]} , ${mascota[1]}`;
}

const addBook = (usuario) => {
    const libro = datos[0].libro;
    return `${"Titulo : " + " " + libro[0].titulo}`
}

const countMascotas = (usuario) => {
    const mascota = datos[0].mascotas;
    return "Cantidad de mascotas : " + mascota.reduce((total, mascota) => {
        return total + 1;
    }
    , 0);
}

const getBooksName = (usuario) => {
    const libro = datos[0].libro;
    return libro.map(libro => {
        return libro.titulo;
    }
    );
}

console.log(getFullName(datos));
console.log(addMascota(datos));
console.log(countMascotas(datos));
console.log(addBook(datos));
console.log(getBooksName(datos));