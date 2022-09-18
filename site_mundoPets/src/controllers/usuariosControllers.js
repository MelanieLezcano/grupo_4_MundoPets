const fs = require('fs');
const path = require('path')
<<<<<<< HEAD
const {validationResult} = require('express-validator');
/* const bcrypt = require('bcryptjs') */
=======

const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
>>>>>>> bd7be316b94496bd9d030bdc5d64d73ff5c3618c
const usuarios = require('../data/usuarios.json')

const guardar = (dato) => fs.writeFileSync(path.join(__dirname, '../data/usuarios.json'), JSON.stringify(dato, null, 4), 'utf-8') 

module.exports = {
<<<<<<< HEAD
=======
    login: (req, res) => {
        return res.render('usuarios/login')
    },

    processLogin: (req, res) => {},

>>>>>>> bd7be316b94496bd9d030bdc5d64d73ff5c3618c
    register: (req, res) => {
        return res.render('usuarios/register')
    },
    login: (req, res) => {
        return res.render('usuarios/login')
    },
    processLogin:(req,res) => {
        /* return res.send(req.body) */
        let errors = validationResult(req)
         if(req.fileValidationError){
            let imagen = {
                param: 'imagen',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        } 
        if (errors.isEmpty()) {

            const {email,recordarme} = req.body
            let usuario = usuarios.find(usuario => usuario.email === email)
            
            req.session.usuarioLogin = {
                id : usuario.id,
                nombre: usuario.nombre,
                imagen: usuario.imagen,
                rol: usuario.rol
            }
            if (recordarme) {
                res.cookie('MundoPets',req.session.usuarioLogin,{
                    maxAge: 1000 * 60 * 60 * 24
                })
            }
            

            return res.redirect('/usuarios/perfil')
            /* return res.send(req.body) */
        } else {
            /* return res.send(errors.mapped()) */
             return res.render('usuarios/login',{
                errors: errors.mapped(),
                old: req.body
            }) 
        }
    },
    perfil: (req,res) =>{
        return res.render('usuarios/perfil')
    },
    cerrarSesion :(req,res) => {
        req.session.destroy();
        return res.redirect('/')
    }
}