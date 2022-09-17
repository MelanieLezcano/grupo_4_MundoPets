const express = require('express') /*  */
const {login,register, processLogin,perfil,cerrarSesion} = require('../controllers/usuariosControllers')
const router = express.Router()


const upload = require('../middlewares/multerUsuarios')
const loginValidaciones = require('../validations/loginValidaciones')

/* const registerValidaciones = require('../validations/registerValidaciones') */


/* register */
router.get('/register', register)


/* login */
router.get('/login', login)
router.post('/login',loginValidaciones,processLogin);


/* perfil */
router.get('/perfil',perfil)
router.delete('/cerrarSesion',cerrarSesion)


module.exports = router