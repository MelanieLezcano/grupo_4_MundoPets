const {crear,editar,lista,historial, nuevo, actualizar, eliminar} = require('../controllers/adminController')
const express = require('express');
const router = express.Router();




/* GET home page */
router.get('/lista', lista);
router.get('/historial',historial);


 /* Creando un producto */
router.get('/crear', crear);
router.post('/crear', nuevo);



 /* Editando un producto */
router.get('/editar/:id', editar)
router.put('/editar/:id', actualizar)


 /* Eliminando un producto */
router.delete('/eliminar/:id', eliminar)

module.exports = router