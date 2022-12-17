const {check,body} = require('express-validator');
/* nos traemos el req.body de nuestra vista del formulario */
module.exports = [

    check('contrasenia')
    .notEmpty().withMessage('Debe ingresar su contraseña actual').bail(),
    body('contrasenia').custom((value,{req}) => value !== req.body.usuario.contraseña ? false : true)
    .withMessage('Las contraseñas no coinciden'),

    check('contraseniaNueva')
    .notEmpty().withMessage('Ingresar nueva contraseña').bail()
    .isLength({min:8}).withMessage('Debe contener al menos 8 caracteres'),

    check('contraseniaNueva2')
    .notEmpty().withMessage('Confirmar nueva contraseña').bail(),
    /* .isLength({min:8}).withMessage('Debe contener al menos 8 caracteres').bail(), */
    

    /* body traermos el body trabaja con contraseña de confirmar contraseña, tenemos  q hacer una cudtom para hacer la contraseña a nuestro gusto, tendra un value que sera el valor del body,utilizaremos el value y utilizamos el req lo trabajamos como objeto literal,como validacion,es una funcion q recibe 2 paametroa  si value es dist req.body.pass entonces sera un false sino sera un true  que pase este mensaje. va mandar un mensaje de error es decir las contraseñas no coinciden. */
    body('contraseniaNueva2').custom((value,{req}) => value !== req.body.contraseniaNueva ? false : true)
    .withMessage('Las contraseñas no coinciden')
    

  
    
]
