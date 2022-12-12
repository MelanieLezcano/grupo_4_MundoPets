const {crear,editar,lista,nuevo,historial,actualizar,eliminar,restaurar} = require('../controllers/adminController')
const express = require('express') 
const router = express.Router()

const productosValidaciones= require('../validations/productosValidaciones')
const upload = require('../middlewares/multerProductos')
const adminCheck = require('../middlewares/adminCheck')


/* GET home page */
router.get('/lista',adminCheck, lista);
router.get('/historial',adminCheck,historial);


// ************ Middleware Require ************
/* const upload = require('../middlewares/creacionProducto'); */

/* crear un producto */
/* trabajan con la misma ruta pero el metodo es diferente */
router.get('/crear', crear); /* estoy pidiendo la vista del formulario,sea de crear editar o lo q sea, */
router.post('/crear',upload.single('Imagenes'),productosValidaciones,nuevo); /* por la misma ruta yo envio el formulario para que lo complete,post va modificar el tipo de vista para poder modificar y enviar informacion hacia el modelo */

/* editar producto */
router.get('/editar/:id',adminCheck,editar);
router.put('/editar/:id',upload.single('Imagenes'),productosValidaciones,actualizar);

/* Eliminando un producto */
router.delete('/eliminar/:id', eliminar);
router.delete('/restaurar/:id', restaurar);


module.exports = router;



