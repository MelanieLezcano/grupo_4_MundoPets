const express = require('express') /*  */
const router = express.Router()


let {crear,editar,lista,update,destroy} = require('../controllers/adminController')

router.get('/lista', lista)
router.get('/editar', editar)
router.get('/crear', crear)

/* Creando un producto */
router.put('/edit/:id',update);

/* Eliminando un producto */

router.delete('/destroy/:id',destroy);

module.exports = router
