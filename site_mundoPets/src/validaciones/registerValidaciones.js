const { check, body } = require('express-validator')

module.exports = [
    // Nombre
    check('nombre').trim()
        .notEmpty().withMessage('Debe ingresar su nombre').bail()
        .isLength({ min: 2 }).withMessage('Debe contener al menos 2 caracteres'),


    // Apellido
    check('apellido').trim()
        .notEmpty().withMessage('Debe ingresar su apellido').bail()
        .isLength({ min: 2 }).withMessage('Debe contener al menos 2 caracteres'),

    // Email
    check('email').trim()
        .notEmpty().withMessage('Debe ingresar su email').bail()
        .isEmail().withMessage('Debe ingresar un email valido'),

    // Contraseña
    check('contrasenia')
        .isLength({ min: 8 }).withMessage('Debe contener al menos 8 caracteres'),
    check('contrasenia2')
        .isLength({ min: 8 }).withMessage('Debe contener al menos 8 caracteres').bail(),

    body('contrasenia2')
        .custom((value, { req }) => value !== req.body.contrasenia ? false : true)
        .withMessage('Las contraseñas no coinciden')
]