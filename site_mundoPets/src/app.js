const express = require ('express');
const app = express();
const port = 3000;
const path = require ('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const session = require('express-session')


/* implementar locals dentro de la app*/
const usuarioLogin = require('./middlewares/usuarioLoginCheck')

/* requerir las rutas */
let indexRouter = require('./routes/index')
let adminRouter = require('./routes/admin')
let productosRouter = require('./routes/productos')
let usuariosRouter = require('./routes/usuarios')


//view engine setup
app.set('views', path.join(__dirname,'views'));
app.set('view engine','ejs')
/* liveReloadServer.watch(path.join(__dirname,'views')); en el caso que se use live reload*/

/* metodos HHTP (post) */
app.use(express.urlencoded({ extended: false}));
app.use(express.json()); //si se usa JSON CLASE54, 1:10:48


app.use(express.static(path.resolve(__dirname,'../public')));

/* trabajar con put y delete */
app.use(methodOverride('_method'))



/* Login e inicio de sesion */
app.use(session({secret : "Mundo Pets"}))



app.use(usuarioLogin)

app.use(cookieParser());

app.use(express.static(path.join(__dirname,'..', 'public')));



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