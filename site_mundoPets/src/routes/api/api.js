const express = require('express') 
const router = express.Router()


let {nuestrosProductos} = require('../../controllers/apiController/apiController')


router.get('/nuestrosProductos',nuestrosProductos);






module.exports = router;