const express = require('express') /*  */
const {login,register, processRegister, processLogin,perfil,datosPerfil,cerrarSesion, editarPerfil,nuevoPerfil, cambiarContrasenia, actualizarContrasenia} = require('../controllers/usuariosControllers')
const router = express.Router()

const upload = require('../middlewares/multerUsuarios')
const registerValidaciones = require('../validations/registerValidaciones')
const loginValidaciones = require('../validations/loginValidaciones')
const cambiarContraseniaValidaciones = require('../validations/cambiarContraseniaValidaciones')


router.get('/register', register);
router.post('/register',upload.single('imagenes'),registerValidaciones,processRegister);

router.get('/login',login)
router.post('/login',loginValidaciones,processLogin);

router.get('/perfil',perfil)
router.get('/datosPerfil',datosPerfil)

router.get('/editarPerfil',editarPerfil)
router.put('/editarPerfil/:id',upload.single('imagenes'),nuevoPerfil)

router.get('/cambiarContrasenia',cambiarContrasenia)
router.put('/cambiarContrasenia/:id', cambiarContraseniaValidaciones,actualizarContrasenia)

router.delete('/cerrarSesion',cerrarSesion)

module.exports = router