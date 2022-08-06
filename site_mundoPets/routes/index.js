const express = require('express') 
const router = express.Router()


let {home} = require('../controllers/indexControllers')

router.get('/', home)


module.exports = router