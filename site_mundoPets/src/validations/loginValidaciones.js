const {check,body} = require('express-validator');
const usuarios = require('../data/usuarios.json')
const bcryptjs = require('bcryptjs')
module.exports = [
 /* email */
 check('email').trim()
 .notEmpty().withMessage('Debe ingresar su email').bail()
 .isEmail().withMessage('Debe ingresar un email válido'),

 
 /* contraseña */
 check('contrasenia').trim()
 .notEmpty().withMessage('Debe ingresar su contraseña').bail()
 .isLength({min:8}).withMessage('Debe contener al menos 8 caracteres'),
 
 body('email') /* value es lo que estamos recibiendo por valor de email */
 .custom((value,{req}) => {
    let usuario = usuarios.find(usuario => usuario.email === value && bcryptjs.compareSync(req.body.contrasenia, usuario.contrasenia))
    if (usuario) {
        return true
    }else{
        return false
    }
 })
/*  .withMessage('El mail o la contraseña no coinciden') */
 .withMessage('El usuario no se encuentra registrado')
]