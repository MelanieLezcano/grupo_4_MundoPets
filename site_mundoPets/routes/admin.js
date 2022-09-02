const {crear,editar,lista,historial,nuevo,actualizar,eliminar,restaurar} = require('../controllers/adminController')
const express = require('express');
const router = express.Router();

/* GET home page */
router.get('/lista', lista);
router.get('/historial',historial);

/* CREAR UN PRODUCTO */
router.get('/crear', crear);
router.post('/crear', nuevo);

/* EDITAR UN PRODUCTO */

 /* Editando un producto */
router.get('/editar/:id', editar)
router.put('/editar/:id', actualizar)


/* ELIMINAR UN PRODUCTO */
router.delete('/eliminar/:id', eliminar)
router.delete('/restaurar/:id', restaurar)


module.exports = router