const express = require('express')
const router = express.Router()

const {detalle,carrito,categoria} = require('../controllers/productosController')

router.get('/detalle/:id',detalle)
router.get('/carrito/:id', carrito)
router.get('/:categoria',categoria)
module.exports = router;