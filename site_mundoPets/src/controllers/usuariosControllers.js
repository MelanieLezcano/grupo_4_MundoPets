const fs = require('fs');
const path = require('path')
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
let db = require('../database/models')

module.exports = {
    register: (req, res) => {
        return res.render('usuarios/register')
    },
    processRegister: (req, res) => {
       /*  return res.send (req.file)  */
        let errors = validationResult(req)
        if (req.fileValidationError /* != undefined */) {
            let imagen = {
                param: 'imagen',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        }
        if (errors.isEmpty()) {

            let { nombre, email, contrasenia, apellido } = req.body

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
                imagen: req.file && req.file.size > 1 ? req.file.filename : "foto_perfil_por_defecto.jpg",
                roles_id: 2
             })
            
            .then(usuario => {
                req.session.usuarioLogin = {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    imagen: usuario.imagen,
                    apellido:usuario.apellido,
                    rol: usuario.roles_id
                }
                return res.redirect('/')
            })
            .catch(errores => res.send(errores))
        } else {

            let ruta = (dato) => fs.existsSync(path.join(__dirname, '..', '..', 'public', 'img', 'usuarios', dato))

            if ((req.file)) {
              
                if (ruta(req.file.filename) && (req.file.filename !== "default-image.png")) {
                    fs.unlinkSync(path.join(__dirname, '..', '..', 'public', 'img', 'usuarios', req.file.filename))
                }
                
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

          db.Usuarios.findOne({
            where : {
                email 
           }
          })
          .then(usuario => {
            req.session.usuarioLogin = {
                id: usuario.id,
                nombre: usuario.nombre,
                apellido: usuario.apellido,
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
    editarPerfil: (req, res) => {
        return res.render('usuarios/editarPerfil')
    }, 

    nuevoPerfil: (req, res) => {
        let id  = req.params.id
        let{nombre, apellido} = req.body

        db.Usuarios.findOne({where: {id: id}})
        .then(usuario => {
            db.Usuarios.update({
                nombre,
                apellido,
                imagen: req.file ? req.file.filename : "avatar-1663535027596.jpg",
            },{
                where: {id:id}
            })
            .then(nuevo => {
                return res.redirect('/')
            })

        })
        .catch(error => res.status(500).send(error))

    },


 

    cerrarSesion: (req, res) => {

        req.session.destroy();
        if (req.cookies.MundoPets) {
            res.cookie('MundoPets', '', { maxAge: -1 })
        }
        return res.redirect('/')
    }
}