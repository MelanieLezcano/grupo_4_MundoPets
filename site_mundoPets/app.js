const express = require ('express');
const path = require ('path');

const app = express();
const port = 3000

const publicPath = path.resolve(__dirname, './public');

app.use (express.static (publicPath));

app.get ('/',(req,res) => {res.sendFile (path.join (__dirname, './views/home.html'))});
app.get ('/carrito',(req,res) => {res.sendFile (path.join (__dirname, './views/carrito.html'))});
app.get ('/detalle',(req,res) => {res.sendFile (path.join (__dirname, './views/detalle.html'))});
app.get ('/register',(req,res) => {res.sendFile (path.join (__dirname, './views/register.html'))});
app.get ('/login',(req,res) => {res.sendFile (path.join (__dirname, './views/login.html'))});
app.get ('/contacto',(req,res) => {res.sendFile (path.join (__dirname, './views/contacto.html'))});

app.listen (port,() => console.log("servidor levantado")
);