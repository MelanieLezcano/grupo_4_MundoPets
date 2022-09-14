let {home,vistaProductos,contacto,nosotros} = require('../controllers/indexController')
const express = require('express') 
const router = express.Router()



router.get('/', home);
router.get('/vistaProductos/:categoria', vistaProductos);
router.get('/contacto',contacto);
router.get('/nosotros',nosotros);



module.exports = router;