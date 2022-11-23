const express = require('express') /*  */
const {login,register, processRegister, processLogin,perfil,cerrarSesion, editarPerfil} = require('../controllers/usuariosControllers')
const router = express.Router()

const upload = require('../middlewares/multerUsuarios')
const registerValidaciones = require('../validations/registerValidaciones')
const loginValidaciones = require('../validations/loginValidaciones')



router.get('/register', register);
router.post('/register',upload.single('imagen'),registerValidaciones,processRegister);

router.get('/login',login)
router.post('/login',loginValidaciones,processLogin);

router.get('/perfil',perfil)
router.get('/editarPerfil',editarPerfil)
router.delete('/cerrarSesion',cerrarSesion)

module.exports = router