let {home,vistaProductos} = require('../controllers/indexController')
const express = require('express') 
const router = express.Router()



router.get('/', home);
router.get('/vistaProductos/:categoria', vistaProductos);


module.exports = router