const express = require('express') /*  */
const router = express.Router()


let {crear,editar,lista,historial} = require('../controllers/adminController')

/* GET home page */
router.get('/lista', lista);
router.get('historial',historial);




router.get('/editar', editar)
router.get('/crear', crear)

module.exports = router