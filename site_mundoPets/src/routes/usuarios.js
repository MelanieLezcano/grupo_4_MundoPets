const express = require('express')
const router = express.Router()
const registerValidaciones = require('../validaciones/registerValidaciones')
const upload = require('../middlewares/multerUsuarios')

let { login, register, processRegister, processLogin } = require('../controllers/usuariosControllers')


router.get('/register', register)
router.post('/register', upload.single('imagenPerfil') , registerValidaciones , processRegister)

router.get('/login', login)
router.get('/login', processLogin)

module.exports = router