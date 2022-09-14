const {crear,editar,lista,nuevo,historial,actualizar,eliminar,restaurar} = require('../controllers/adminController')
const express = require('express') 
const router = express.Router()
const path = require('path')
const multer = require('multer')


const storage =multer.diskStorage({
    destination:(req,file,callback)  => {
        callback(null,'./public/img')
    },
    filename:(req,file,callback) => {
        callback(null,'img-' + Date.now() + path.extname(file.originalname)) 
    }
})
 
const upload = multer({
    storage
})



/* GET home page */
router.get('/lista', lista);
router.get('/historial',historial);


// ************ Middleware Require ************
/* const upload = require('../middlewares/creacionProducto'); */

/* crear un producto */

router.get('/crear', crear); 
router.post('/crear',upload.single('imagenes'),nuevo); 

/* editar producto */
router.get('/editar/:id', editar);
router.put('/editar/:id',upload.single('imagenes'),actualizar);

/* Eliminando un producto */
router.delete('/eliminar/:id', eliminar);
router.delete('/restaurar/:id', restaurar);


module.exports = router;



