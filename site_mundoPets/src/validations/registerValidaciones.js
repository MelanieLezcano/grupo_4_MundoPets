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
    /* email */
    check('email').trim()
    .notEmpty().withMessage('Debe ingresar su email').bail()
    .isEmail().withMessage('Debe ingresar un email válido'),
    /* contraseña */
    check('contrasenia')
    .notEmpty().withMessage('Debe ingresar una contraseña').bail()
    .matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,12}$/)
    .withMessage('La contraseña debe contener al menos un número, una mayúscula, una minúscula y tener 8 a 12 caracteres'),
    check('contrasenia2')
    .notEmpty().withMessage('Debe confirmar su contraseña').bail(),
    /* .isLength({min:8}).withMessage('Debe contener al menos 8 caracteres').bail(), */
    

    /* body traermos el body trabaja con contraseña de confirmar contraseña, tenemos  q hacer una cudtom para hacer la contraseña a nuestro gusto, tendra un value que sera el valor del body,utilizaremos el value y utilizamos el req lo trabajamos como objeto literal,como validacion,es una funcion q recibe 2 paametroa  si value es dist req.body.pass entonces sera un false sino sera un true  que pase este mensaje. va mandar un mensaje de error es decir las contraseñas no coinciden. */
    body('contrasenia2').custom((value,{req}) => value !== req.body.contrasenia ? false : true)
    .withMessage('Las contraseñas no coinciden')
    

  
    
]
