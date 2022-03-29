const express = require("express");
const handlebars = require('express-handlebars')
const path = require('path')
const { Server: HttpServer } = require("http");
const { Server: IOServer } = require("socket.io");
const fs = require('fs')
const app = express();

// Configuracion de handlebars
app.engine(
  "hbs",
  handlebars.engine({
      extname: ".hbs",
      defaultLayout: 'nuevoProducto.hbs',
      layoutsDir: __dirname + "/views/layouts",
      partialsDir: __dirname + "/views/partials/"
  })
)

// Configuracion
app.set('views', path.join(__dirname, 'views/layouts'))
app.set('view engine', 'hbs');

// Routes
app.use(require('./routes/rutas'))

// Productos
const json_products = fs.readFileSync('public/productos.json', 'utf-8')
let products = JSON.parse(json_products)

// Mensajes
const json_mensajes = fs.readFileSync('mensajes.json', 'utf-8')
let messages = JSON.parse(json_mensajes)

// Inicializando el Servidor
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

httpServer.listen(8080, function () {
  console.log("Servidor corriendo en http://localhost:8080");
});


io.on("connection", function (socket) {
  console.log("Un cliente se ha conectado");
  socket.emit("messages", messages);

  // recibe los mensajes y lo agrega al arreglo
  socket.on("new-message", (data) => {
    messages.push(data);
    const json_mensajes = JSON.stringify(messages)
    fs.writeFileSync('mensajes.json', json_mensajes, 'utf-8')
    io.sockets.emit("messages", messages);
  });

  socket.emit("products", products);

  socket.on("new-products", (data) => {
    products.push(data);
    const json_products = JSON.stringify(products)
    fs.writeFileSync('public/productos.json', json_products, 'utf-8')
    io.sockets.emit("products", products);
  });
});

app.use(express.static("public"));
