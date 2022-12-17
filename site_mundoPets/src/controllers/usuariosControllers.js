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

            let { nombre, email, contrasenia, apellido, contacto, ciudad, genero } = req.body

              db.Usuarios.create({
              
                nombre,
                apellido,
                email,
                contraseña: bcrypt.hashSync(contrasenia, 10),
                contacto: '',
                ciudad: '',
                genero: '',
                /* direccion, */
                /* numeroTarjeta, */
                imagen: req.file && req.file.size > 1 ? req.file.filename : "foto_perfil_por_defecto.jpg",
                roles_id: 2
             })
            
            .then(usuario => {
                req.session.usuarioLogin = {
                    id: usuario.id,
                    nombre: usuario.nombre,
                    apellido:usuario.apellido,
                    email: usuario.email,
                    contraseña: usuario.contrasenia,
                    contacto: usuario.contacto,
                    ciudad: usuario.ciudad,
                    genero: usuario.genero,

                    imagen: usuario.imagen,
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
                email: usuario.email,
                contacto: usuario.contacto,
                ciudad: usuario.ciudad,
                genero: usuario.genero,
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
    datosPerfil: (req, res) => {
        return res.render('usuarios/datosPerfil')
    },
    editarPerfil: (req, res) => {
        return res.render('usuarios/editarPerfil')
    }, 

    nuevoPerfil: (req, res) => {
        let id  = req.params.id
        let{nombre, apellido, email, contacto, ciudad, genero} = req.body

        db.Usuarios.findOne({where: {id: id}})
        .then(usuario => {
            db.Usuarios.update({
                nombre: nombre,
                apellido: apellido,
                email: usuario.email,
                contacto: contacto,
                ciudad: ciudad,
                genero: genero,
                imagen: req.file ? req.file.filename : usuario.imagen,
            }
            ,{
                where: {id:id}
            })
            .then(nuevo => {
                
                if (req.file){
                    if((fs.existsSync('./public/img/usuarios/', usuario.imagen)) && usuario.imagen !== "foto_perfil_por_defecto.jpg"){
                    fs.unlinkSync(`./public/img/usuarios/${usuario.imagen}`)}}
                

/*                 return res.redirect('/usuarios/perfil') */
                db.Usuarios.findOne({where: {id: id}})
                .then(data =>{
                    console.log(data);
                    req.session.usuarioLogin = {
                        id: data.id,
                        nombre: data.nombre,
                        apellido: data.apellido,
                        email: data.email,
                        contacto: data.contacto,
                        ciudad: data.ciudad,
                        genero: data.genero,
                        imagen: data.imagen,
                        rol: data.roles_id
                    }


                    if (req.cookies.MundoPets) {
                        res.cookie('MundoPets', '', { maxAge: -1 })
                        res.cookie('MundoPets', req.session.usuarioLogin, {
                            maxAge: 1000 * 60 * 60 * 24
                        })
                        
                    }
                    
                    req.session.save( (err) => {
                        req.session.reload((err) => {
                            return res.redirect('/usuarios/perfil')
        
                        });
                     });


                 })
                 
            })
            .catch(error => res.status(500).send(error))

        })
        .catch(error => res.status(500).send(error))

        /* db.Usuarios.findOne({where: {id: id}})
        .then(usuario => {
            db.Usuarios.update({
                nombre: usuario.nombre,
                apellido: usuario.apellido,
                email: usuario.email,
                contacto: usuario.contacto,
                ciudad: usuario.ciudad,
                genero: usuario.genero,
                imagen: usuario.imagen,
            },{
                where: {id:id}
            })
            .then(nuevo => {
                return res.redirect('/usuarios/perfil')
            })

        })
        .catch(error => res.status(500).send(error)) */

    },

    cambiarContrasenia: (req, res) => {

        res.render('usuarios/cambiarContrasenia',{
            title:"Cambiar Contrasenia",
            session: req.session
        })
    },

    actualizarContrasenia: (req, res) => {
        let errors = validationResult(req)
        if(errors.isEmpty()) {
            db.Usuarios.findOne({
                where: {
                    id: +req.params.id
                }
            })
            .then(usuario => {
                if(usuario && bcrypt.compareSync(req.body.contrasenia, usuario.contraseña)){
                    db.Usuarios.update({
                        contraseña: bcrypt.hashSync(contraseniaNueva2, 10)
                    },{
                        where : { id: req.params.id}
                    })
                    .then(() => {
                        res.redirect("usuarios/perfil");
                    })
                    .catch((err) => console.log(err))
                } else{
                    res.render("usuarios/cambiarContraseña", {
                        title: "Cambiar contraseña",
                        session: req.session,
                        errPassword : "Debes ingresar tu contraseña actual"
                    })
                }
            })
        }
    },

 

    cerrarSesion: (req, res) => {

        req.session.destroy();
        if (req.cookies.MundoPets) {
            res.cookie('MundoPets', '', { maxAge: -1 })
        }
        return res.redirect('/')
    }
}