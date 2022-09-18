const fs = require('fs')
const path = require('path')

const { validationResult } = require('express-validator')
const usuarios = require('../data/usuarios.json')
const guardar = (dato) => fs.writeFileSync(path.join(__dirname, '../data/usuarios.json')
    , JSON.stringify(dato, null, 4), 'utf-8')

module.exports = {
    login: (req, res) => {
        return res.render('usuarios/login')
    },

    processLogin: (req, res) => {
        let errors = validationResult(req)
        if (errors.isEmpty()) {
            return res.send(req.body)
        } else {
            /* return res.send(errors.mapped()) */
            return res.render('usuarios/login', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },

    register: (req, res) => {
        return res.render('usuarios/register')
    },

    processRegister: (req, res) => {

        let errors = validationResult(req)
        if (req.fileValidationError) {
            let imagenPerfil = {
                param: 'imagenPerfil',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagenPerfil)
        }

        if (errors.isEmpty()) {
            let { nombre, email, contrasenia, apellido } = req.body
            let usuarioNuevo = {
                id: usuarios[usuarios.length - 1].id + 1,
                nombre,
                apellido,
                email,
                contrasenia,
                imagenPerfil: req.body.imagenPerfil ? req.body.imagenPerfil : "avatar-porDefecto.jpg",
                rol: "usuario"
            }
            usuarios.push(usuarioNuevo)
            guardar(usuarios)

            return res.redirect('/')
        } else {
            /* return res.send(errors.mapped()) */
            return res.render('usuarios/register', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
}