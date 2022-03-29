let botonEnviar = document.getElementById('botonEnviar');
let email = document.getElementById('username');
let texto = document.getElementById('texto');
let title = document.getElementById('title');
let price = document.getElementById('price');
let imagen = document.getElementById('imagen');

// Nuevo Producto
let botonGuardar = document.getElementById('botonGuardar');


botonGuardar.disabled = true
botonEnviar.disabled = true
texto.disabled = true

const camposFormVacios = () => {
    if(title.value == "" || price.value == "" || imagen.value == ""){
        botonGuardar.disabled = true
    }else {
        botonGuardar.disabled = false
    }
}

// Chat (Mensajes)
const campoNombreVacio = () => {
    if (email.value==""){	  
        texto.disabled = true
        botonEnviar.disabled = true
    }else {
            texto.disabled = false
    }
}

const campoMensajeVacio = () =>{
    if (texto.value==""){	  
        botonEnviar.disabled = true
    }else {
            botonEnviar.disabled = false
    }
}
