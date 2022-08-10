const express = require('express') /*  */
const router = express.Router()


const {carrito,detalle} = require('../controllers/productoController')

router.get('/detalle/:id', detalle)
router.get('/carrito', carrito)


module.exports = router