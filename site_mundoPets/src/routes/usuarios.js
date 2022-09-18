const express = require('express') /*  */
const router = express.Router()


let {login,register} = require('../controllers/usuariosControllers')


router.get('/register', register)
router.get('/login', login)

module.exports = router