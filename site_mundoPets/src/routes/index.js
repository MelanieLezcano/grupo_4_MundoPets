let {home,contacto,nosotros,search,nuestrosProductos} = require('../controllers/indexController')
const express = require('express') 
const router = express.Router()



router.get('/', home);
router.get('/busqueda', search);
router.get('/contacto',contacto);
router.get('/nosotros',nosotros);
router.get('/nuestrosProductos',nuestrosProductos);






module.exports = router;