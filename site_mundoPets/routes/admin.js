const express = require('express') /*  */
const router = express.Router()


let {crear,editar,lista,actualizar,eliminar} = require('../controllers/adminController')

router.get('/lista', lista)
router.get('/editar', editar)
router.get('/crear', crear)

/* Creando un producto */
router.put('/edit/:id',actualizar);

/* Eliminando un producto */

router.delete('/eliminar/:id',eliminar);

module.exports = router
