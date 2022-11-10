require ('dotenv').config()
const express = require ('express');
const app = express();
const port = 3000;
const path = require ('path');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const session =require('express-session')

const testConection = require('./utils/dbConnection')

testConection()

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
app.use(express.urlencoded({ extended: false}));/* para trabajar con req.body */
app.use(express.json()); //si se usa JSON CLASE54, 1:10:48


app.use(express.static(path.resolve(__dirname,'..', 'public')));

/* trabajar con put y delete */
app.use(methodOverride('_method'))/* para trabajar los formularios de mejor manera */


/* login e inicio de sesion  */
app.use(session({secret:"Mundo Pets"}))

app.use(usuarioLogin)

app.use(cookieParser());

//RUTAS
app.use("/", indexRouter);
app.use("/usuarios", usuariosRouter);
app.use("/productos", productosRouter);
app.use("/admin", adminRouter);

app.listen (port,() => console.log("servidor levantado")
);

