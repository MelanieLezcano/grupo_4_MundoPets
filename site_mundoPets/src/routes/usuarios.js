const express = require('express') /*  */
const {login,register, processRegister, processLogin,perfil,editarPerfil,nuevoPerfil,cerrarSesion} = require('../controllers/usuariosControllers')
const router = express.Router()

const upload = require('../middlewares/multerUsuarios')
const registerValidaciones = require('../validations/registerValidaciones')
const loginValidaciones = require('../validations/loginValidaciones')



router.get('/register', register);
router.post('/register',upload.single('imagenes'),registerValidaciones,processRegister);

router.get('/login',login)
router.post('/login',loginValidaciones,processLogin);

router.get('/perfil',perfil)
/* editar perfil */
router.get('/EditarPerfil',editarPerfil)
router.put('/EditarPerfil/:id',upload.single('imagenes'),nuevoPerfil)
router.delete('/cerrarSesion',cerrarSesion)

module.exports = router