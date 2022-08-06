const express = require('express') /*  */
const router = express.Router()


let {login,register} = require('../controllers/usersControllers')


router.get('/register', register)
router.get('/login', login)

module.exports = router