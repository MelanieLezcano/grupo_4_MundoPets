const express = require ('express');
const app = express();
const port = 3000;
const path = require ('path');


/* requerir las rutas */
let indexRouter = require('./routes/index')
let adminRouter = require('./routes/admin')
let productosRouter = require('./routes/productos')
let usuariosRouter = require('./routes/usuarios')




//view engine setup
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs')
/* liveReloadServer.watch(path.join(__dirname,'views')); en el caso que se use live reload*/

//middlewares
app.use(express.json()); //si se usa JSON CLASE54, 1:10:48
app.use(express.static(path.resolve(__dirname,'public')));
app.use(express.urlencoded({ extended: false })); //para trabajar con el req.body

//RUTAS
app.use("/", indexRouter);
app.use("/usuarios", usuariosRouter);
app.use("/productos", productosRouter);
app.use("/admin", adminRouter);

app.listen (port,() => console.log("servidor levantado")
);

/* app.get ('/',(req,res) => {res.sendFile (path.join (__dirname, './views/home.html'))});
app.get ('/carrito',(req,res) => {res.sendFile (path.join (__dirname, './views/carrito.html'))});
app.get ('/detalle',(req,res) => {res.sendFile (path.join (__dirname, './views/detalle.html'))});
app.get ('/register',(req,res) => {res.sendFile (path.join (__dirname, './views/register.html'))});
app.get ('/login',(req,res) => {res.sendFile (path.join (__dirname, './views/login.html'))});
app.get('/contacto',(req,res) => res.sendFile(path.resolve(__dirname,'views','contacto.html')))
app.get('/gatos',(req,res) => res.sendFile(path.resolve(__dirname,'views','gatos.html')))
app.get('/nosotros',(req,res) => res.sendFile(path.resolve(__dirname,'views','nosotros.html')))
app.get('/perros',(req,res) => res.sendFile(path.resolve(__dirname,'views','perros.html'))) */