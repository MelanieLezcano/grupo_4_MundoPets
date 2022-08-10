let {home,gatos,perros} = require('../controllers/indexController')
const express = require('express') 
const router = express.Router()



router.get('/', home);
router.get('/gatos', gatos);
router.get('/perros', perros);


module.exports = router