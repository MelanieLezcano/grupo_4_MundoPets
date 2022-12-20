const {check,body} = require('express-validator');
/* nos traemos el req.body de nuestra vista del formulario */
module.exports = [
    /* nombre */
    check('nombre').trim()
    .notEmpty().withMessage('Debe ingresar su nombre').bail()
    .isLength({min:2}).withMessage('Debe contener mas de 2 caracteres'),
      // Apellido
     check('apellido').trim()
      .notEmpty().withMessage('Debe ingresar su apellido').bail()
      .isLength({ min: 2 }).withMessage('Debe contener mas de  2 caracteres'), 
    
]
