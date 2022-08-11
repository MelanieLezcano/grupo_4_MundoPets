const express = require('express')
const router = express.Router()

const {detalle,carrito} = require('../controllers/productoController')

router.get('./detalle/:id',detalle)
router.get('/carrito',carrito)

module.exports = router;