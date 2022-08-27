let {home,vistaProductos} = require('../controllers/indexController')
const express = require('express') 
const router = express.Router()



router.get('/', home);
router.get('/vistaProductos', vistaProductos);


module.exports = router