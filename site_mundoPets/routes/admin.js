const express = require('express') 
const router = express.Router()

let {crear,editar,lista,historial, nuevo, actualizar, eliminar} = require('../controllers/adminController')

/* GET home page */
router.get('/lista', lista);
router.get('/historial',historial);

/* CREAR UN PRODUCTO */
router.get('/crear', crear);
router.post('/crear', nuevo);

/* EDITAR UN PRODUCTO */

router.get('/editar/:id', editar)
router.put('/editar/:id', actualizar)


/* ELIMINAR UN PRODUCTO */
router.delete('/eliminar/:id', eliminar)



module.exports = router