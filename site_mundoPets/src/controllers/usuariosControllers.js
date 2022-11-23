const fs = require('fs');
const path = require('path')
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
let db = require('../database/models')
/* const usuarios = require('../data/usuarios.json') */ //viejo
/* const guardar = (dato) => fs.writeFileSync(path.join(__dirname, '../data/usuarios.json'), JSON.stringify(dato, null, 4), 'utf-8') */ //viejo

module.exports = {
    register: (req, res) => {
        return res.render('usuarios/register')
    },
    processRegister: (req, res) => {
       /*  return res.send (req.body)  */
        let errors = validationResult(req)
        if (req.fileValidationError /* != undefined */) {
            let imagen = {
                param: 'imagen',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        }
        if (errors.isEmpty()) {

            let { nombre, email, contrasenia, apellido,contacto,ciudad,genero} = req.body

            /* {
  "nombre": "Mercedes",
  "apellido": "Alvarez",
  "email": "mechychevy@gmail.com",
  "contrasenia": "12345678",
  "contrasenia2": "12345678",
  "contacto": "1136370707",
  "ciudad": "buenos aires",
  "genero": "femenino"
} */
             db.Usuarios.create({
              
                nombre,
                apellido,
                email,
                contraseña: bcrypt.hashSync(contrasenia, 10),
                /* contacto, */
               /*  ciudad, */
                /* genero, */
                /* direccion, */
                /* numeroTarjeta, */
                imagen: req.file && req.file.size > 1 ? req.file.filename : "avatar-1663535027596.jpg",
                roles_id: 2
             })
                
/* 
            let usuarioNuevo = {
                id: usuarios[usuarios.length - 1].id + 1,
                nombre,
                apellido,
                email,
                contrasenia: bcrypt.hashSync(contrasenia, 10),
                contacto: "",
                ciudad: "",
                genero: "",
               
                direccion: "",
                numeroTarjeta: "",
                imagen: req.file && req.file.size > 1 ? req.file.filename : "avatar-1663535027596.jpg",
                rol: "usuario"

            }
            usuarios.push(usuarioNuevo)
            guardar(usuarios)
 */

            .then(usuario => {
                req.session.usuarioLogin = {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    imagen: usuario.imagen,
                    rol: usuario.roles_id
                }
                return res.redirect('/')
            })
            .catch(errores => res.send(errores))
        } else {

            let ruta = (dato) => fs.existsSync(path.join(__dirname, '..', '..', 'public', 'img', 'usuarios', dato))

            if (ruta(req.file.filename) && (req.file.filename != undefined) && (req.file.filename !== "avatar-1663535027596.jpg")) {
                fs.unlinkSync(path.join(__dirname, '..', '..', 'public', 'img', 'usuarios', req.file.filename))
            }




            return res.render('usuarios/register', {
                errors: errors.mapped(),
                old: req.body
            })
        }

    },
    login: (req, res) => {
        return res.render('usuarios/login')
    },
    processLogin: (req, res) => {
        /* return res.send(req.body) */
        let errors = validationResult(req)
        if (req.fileValidationError) {
            let imagen = {
                param: 'imagen',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        }
        if (errors.isEmpty()) {

            const { email, recordarme } = req.body
          /*   let usuario = usuarios.find(usuario => usuario.email === email) */

          db.Usuarios.findOne({
            where : {
                email 
           }
          })
          .then(usuario => {
            req.session.usuarioLogin = {
                id: usuario.id,
                nombre: usuario.nombre,
                imagen: usuario.imagen,
                rol: usuario.roles_id
            }
            if (recordarme) {
                res.cookie('MundoPets', req.session.usuarioLogin, {
                    maxAge: 1000 * 60 * 60 * 24
                })
            }


            return res.redirect('/usuarios/perfil')
            /* return res.send(req.body) */
          })

          .catch(errores => res.send(errores))

            

          
           
        } else {
            /* return res.send(errors.mapped()) */
            return res.render('usuarios/login', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    perfil: (req, res) => {
        return res.render('usuarios/perfil')
    },
    cerrarSesion: (req, res) => {

        req.session.destroy();
        if (req.cookies.MundoPets) {
            res.cookie('MundoPets', '', { maxAge: -1 })
        }
        return res.redirect('/')
    }
}