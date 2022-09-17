const fs = require('fs');
const path = require('path')
const { validationResult } = require('express-validator');
/* const bcrypt = require('bcryptjs') */
const usuarios = require('../data/usuarios.json')

const guardar = (dato) => fs.writeFileSync(path.join(__dirname, '../data/usuarios.json'), JSON.stringify(dato, null, 4), 'utf-8')

module.exports = {
    register: (req, res) => {
        return res.render('register')
    },
    login: (req, res) => {
        return res.render('usuarios/login')/*  */
    },
    processLogin: (req, res) => {
        /* return res.send(req.body) */
        let errors = validationResult(req)

        /* if (req.fileValidationError) {
            let imagen = {
                param: 'imagen',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        } */
        if (errors.isEmpty()) {

            const { email, recordarme } = req.body
            let usuario = usuarios.find(usuario => usuario.email === email)

            req.session.usuarioLogin = {
                id: usuario.id,
                nombre: usuario.nombre,
                imagen: usuario.imagen,
                rol: usuario.rol
            }}},
            perfil: (req,res) =>{
                return res.render('usuarios/perfil')
            },
            cerrarSesion :(req,res) => {
                req.session.destroy();
                return res.redirect('/')
            }
        }