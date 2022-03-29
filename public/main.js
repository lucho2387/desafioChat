const socket = io.connect();


const hoy = new Date();
const fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear();
const hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
// Obtenemos la Fecha y Hora
const fechaYHora = fecha + ' ' + hora;


// Mensajes
function render(data) {
    const html = data.map(elem => {
        return(`<div>
                    <style type="text/css">
                        strong { font-weight:700; color: blue; }
                        em { font-style: italic; color: green; }
                        span {font-style: normal; color: #804000;}
                    </style>
                    <strong>${elem.author}</strong>
                    [<span>${fechaYHora}</span>] : 
                    <em>${elem.text}</em>
                </div>`)
    }).join(" ");
    document.getElementById('messages').innerHTML = html;
}

socket.on('messages', function(data) { render(data); });

function addMessage(e) {
    const mensaje = {
        author: document.getElementById('username').value,
        fecha: fechaYHora,
        text: document.getElementById('texto').value
    };
    // enviamos los datos al servidor
    socket.emit('new-message', mensaje);
    return false;

}


// Productos
const cargarProductos = async() => {
    try {
        const respuesta = await fetch('productos.json')
        // console.log(respuesta)

        if(respuesta.status === 200){
            const datos = await respuesta.json()

            contenido = ''
            if(datos.length){
                datos.forEach(producto => {
                    contenido += `
                                <tr>
                                    <td class="col-md-2">${producto.title}</td>
                                    <td class="col-md-2">${producto.price}</td>
                                    <td class="col-md-2"><img style="width:10%" src=${producto.imagen}></td>
                                </tr>
                                `
                })
            }else {
                contenido = `
                            <tr>
                                <td colspan="5">No hay Productos</td>
                            </tr>
                            `
            }

            document.getElementById('productos').innerHTML = contenido

        }else if(respuesta.status === 404){
            console.log("No se encontro el archivo")
        }else {
            console.log("Hubo un error no se pudieron mostrar los datos")
        }
    } catch (error) {
        console.log(error)
    }
}

socket.on('products', function() { cargarProductos() });

function addProduct(e) {
    const producto = {
        title: document.getElementById('title').value,
        price: document.getElementById('price').value,
        imagen: document.getElementById('imagen').value
    };
    // enviamos los datos al servidor
    socket.emit('new-products', producto);
    return false;
}



