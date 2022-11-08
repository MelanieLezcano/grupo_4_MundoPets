const fs = require('fs');
const path = require('path')
const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs')
const db = require('../database/models')
/* const usuarios = require('../data/usuarios.json') */ //viejo
/* const guardar = (dato) => fs.writeFileSync(path.join(__dirname, '../data/usuarios.json'), JSON.stringify(dato, null, 4), 'utf-8') */ //viejo

module.exports = {

    register: (req, res) => {
        return res.render('usuarios/register')
    },
    processRegister: (req, res) => {
        /*  return res.send (req.file) */
        let errors = validationResult(req)
        if (req.fileValidationError != undefined) {
            let imagen = {
                param: 'imagen',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        }
        if (errors.isEmpty()) {
            /* return res.status(200).send(req.body) */
            let { nombre, email, contrasenia, apellido } = req.body
            
            db.Usuarios.create({
                nombre: nombre, //revisar
                apellido: apellido,
                genero: '',
                email,
                password: bcrypt.hashSync(contrasenia, 12),
                pais: '',
                provincia: '',
                imagen: req.file ? req.file.filename : "avatar-porDefecto.png",
                roles_id: 2,
                createdAt:new Date,
                updatedAt: new Date
            })
            /* let usuarioNuevo = {
                id: usuarios[usuarios.length - 1].id + 1,
                nombre,
                apellido,
                email,
                contrasenia: bcrypt.hashSync(contrasenia, 10),
                contacto: "",
                ciudad: "",
                genero: "",
                rol: "usuario",
                direccion: "",
                numeroTarjeta: "",
                imagen: req.file && req.file.size > 1 ? req.file.filename : "avatar-1663535027596.jpg",
                rol: "usuario"
            } 
            usuarios.push(usuarioNuevo)
            guardar(usuarios)*/
            .then(usuario => {
                
                req.session.userLogin = {
                    id : usuario.id,
                    nombre : usuario.nombre,
                    image : usuario.imagen,
                    rol : usuario.rolId
                }
            return res.redirect('/')
        })
        .catch(errores => res.send(errores))
        } else {
            let ruta = (dato) => fs.existsSync(path.join(__dirname, '..', '..', 'public', 'img', 'usuarios', dato))

            if (req.file && req.file.filename != undefined && ruta(req.file.filename) && (req.file.filename !== "avatar-1663535027596.jpg")) {
                fs.unlinkSync(path.join(__dirname, '..', '..', 'public', 'img', 'usuarios', req.file.filename)) //en craftsy esta diferente
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
        if (req.fileValidationError) { // ver si esto sigue
            let imagen = {
                param: 'imagen',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        }
        /* if (errors.isEmpty()) {
            const { email, recordarme } = req.body
            let usuario = usuarios.find(usuario => usuario.email === email)
            req.session.usuarioLogin = {
                id: usuario.id,
                nombre: usuario.nombre,
                imagen: usuario.imagen,
                rol: usuario.rol}
            if (recordarme) {
                res.cookie('MundoPets', req.session.usuarioLogin, {
                    maxAge: 1000 * 60 * 60 * 24
                })} */
                if (errors.isEmpty()) {
        
                    const {email,recordarme} = req.body
                    /* let usuario = usuarios.find(user => user.email === email) */
                    db.Usuarios.findOne({
                        where : {
                            email
                        }
                    })
                    .then(usuario => {
                        
                        req.session.userLogin = {
                            id : usuario.id,
                            nombre : usuario.nombre,
                            imagen : usuario.imagen,
                            rol : usuario.roles_id
                        }
                        if(recordarme){
                            res.cookie('Crafsy',req.session.userLogin,{maxAge: 1000 * 60 * 60 * 24})
                        }
            return res.redirect('/usuarios/perfil')
            /* return res.send(req.body) */
        })
        .catch(errores => res.send(errores))

        }else {
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