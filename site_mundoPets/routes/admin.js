const express = require('express') 
const router = express.Router()


let {crear,editar,lista,historial,detalle} = require('../controllers/adminController')

/* GET home page */
router.get('/lista', lista);
router.get('historial',historial);


router.get('/crear', crear);//ya estaba
router.get('/:id', detalle); //agregue y tira error

router.get('/editar', editar)

module.exports = router