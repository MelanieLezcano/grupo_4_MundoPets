const express = require('express') /*  */
const router = express.Router()


let {carrito,detalle} = require('../controllers/productController')

router.get('/carrito', carrito)
router.get('/detalle', detalle)


module.exports = router