const socket = io.connect();

socket.on('messages', data => {
    console.log(data);
})

function render(data) {
    const html = data.map(message => {
        return `
        <ul class="space-y-2 msg">
            <li class="flex justify-start">
                <div class="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                    <span class="block">${message.nombre}</span>
                </div>
                         <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow">
                    <span class="block">${message.text}</span>
                </div>
            </li>
        </ul>
        `
    }).join('');
    document.getElementById('messages').innerHTML = html;
}

socket.on('messages', function(data) { render(data) });

const button = document.getElementById('submit-button').addEventListener('click', sendMessage);
const usuario = document.getElementById('nombre');

// fecha
let timestamp = Date()
const d = new Date( timestamp );
date = d.getHours() + ":" + d.getMinutes() + ", " + d.toDateString();

function sendMessage(){

    if (usuario.value === '') {
        Toastify({
            text: "Ingrese un nombre de usuario",
            duration: 3000,
            className: "alert",
            style: {
              background: "linear-gradient(to right, #f5605b, #ad110c)",
            }
          }).showToast();
        usuario.focus();
        return false;
    }

    const mensaje = {
        usuario: document.getElementById('nombre').value,
        text: document.getElementById('mensaje').value,
        fecha: new Date()
    }

    socket.emit('incomingMessage', mensaje);
}

socket.on('chat', message => {
    const texto = message.map( mensaje => {
        return(`<ul class="space-y-2 msg">
        <li class="flex justify-start">
          <div class="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow user-msg">
            <span class="block text-lg">${mensaje.usuario}</span>
          </div>
          <div class="relative max-w-xl px-4 py-2 text-gray-700 bg-gray-100 rounded shadow msg-div">
            <p class="msg-txt"> ${mensaje.text} <strong class="italic text-xs"> ${date} </strong> </p>
          </div>
        </li>
      </ul>`
        );
    }).join(" ");

    document.getElementById("messages").innerHTML = texto;
});

socket.on("usersList", usuario => {
    const liUser = Object.keys(usuario).map( usuario => {
        return(`
        <li class="flex justify-start li-users">
            <div class="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow">
                <span class="block spanName">${usuario}</span>
            </div>
        </li>`);
    }).join(" ");

    document.getElementById("listUsers").innerHTML = liUser;
});
