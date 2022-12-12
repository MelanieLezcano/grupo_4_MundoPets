let {home,productos,contacto,nosotros,search} = require('../controllers/indexController')
const express = require('express') 
const router = express.Router()



router.get('/', home);
router.get('/busqueda', search);
router.get('/contacto',contacto);
router.get('/nosotros',nosotros);



module.exports = router;