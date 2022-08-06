const express = require('express') /*  */
const router = express.Router()


let {crear,editar,lista} = require('../controllers/adminController')

router.get('/lista', lista)
router.get('/editar', editar)
router.get('/crear', crear)

module.exports = router