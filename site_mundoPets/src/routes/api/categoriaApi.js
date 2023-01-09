const express = require('express') 
const router = express.Router()


let {categoria} = require('../../controllers/apiController/categoriaApiController')


router.get('/:categoria',categoria);






module.exports = router;