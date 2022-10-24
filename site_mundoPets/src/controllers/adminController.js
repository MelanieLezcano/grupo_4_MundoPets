const fs = require('fs')
const path = require('path')
const { validationResult } = require('express-validator')
let db = require('../database/models')
/* const productos = require('../data/productos.json')
const historial = require('../data/historial.json')  */
/* const guardar = (dato) => fs.writeFileSync(path.join(__dirname, '../data/productos.json'), JSON.stringify(dato, null, 4), 'utf-8') 
const guardarHistorial = (dato) => fs.writeFileSync(path.join(__dirname, '../data/historial.json')
    , JSON.stringify(dato, null, 4), 'utf-8') */

/* const productsFilePath = path.join(__dirname, '../data/productsDataBase.json'); */


module.exports = {
    lista: (req, res) => {
        db.Productos.findAll({
            include: [{
                all: true
            }]
        })
            .then(productos => {
                /* return res.send(productos) */
                return res.render('admin/listaProductos', {
                    productos,
                    redirection: "history"// fijarse que nombre va
                })
            })
        /*  return res.render('admin/listaProductos',{ //viejo
             productos,
             redirection: "historial"
         }) */
    },
    crear: async (req, res) => {
        /* return res.render('admin/crearProducto')  */ //viejo
        try {
            let categorias = await db.Categorias.findAll()
            let marcas = await db.Marcas.findAll()
            return res.render('admin/crearProducto', {
                categorias,
                marcas
            })
        } catch (error) {
            return res.send(error)
        }
    },

    nuevo: (req, res) => {

        let errors = validationResult(req)
        if (req.fileValidationError) {
            let Imagenes = {
                param: 'Imagenes',
                msg: req.fileValidationError,
            }
            errors.errors.push(Imagenes)
        }  /* return res.send(errors) */
        if (errors.isEmpty()) {
            /* let Imagenes = req.files.map(imagen => { en crafsty no estaba
                return imagen.filename
            }) */
            let { Categoria, Subcategoria, Marca, Titulo, Precio, Descuento, Descripcion, Stock } = req.body

            db.productos.create({
                /* id: productos[productos.length - 1].id + 1,  */
                categoria: Categoria,
                subcategoria: Subcategoria,
                titulo: Titulo,
                marca: Marca,
                precio: +Precio,
                descuento: +Descuento,
                descripcion: Descripcion,
                stock: +Stock,
                imagenes: req.file ? req.file.filename : 'default-image.png',
            })
                .then(productoNuevo => {
                    if (req.files) {
                        let img = req.files.map(imagen => {
                            let nuevo = {
                                nombre: imagen.filename,
                                productosId: productoNuevo.id
                            }
                            return nuevo

                        })
                        db.Imagenes.bulkCreate(img)
                            .then(imagenes => {
                                return res.redirect('/admin/list')
                            })
                    } else {
                        db.Imagenes.create({
                            nombre: 'default-image.png',
                            productosId: productoNuevo.id
                        })
                            .then(imagenes => {
                                return res.redirect('/admin/list')
                            })
                    }
                })
                .catch(error => res.send(error))
        } else {
            let ruta = (dato) => fs.existsSync(path.join(__dirname, '..', '..', 'public', 'images', 'productos', dato))

            req.files.forEach(imagen => {
                if (ruta(imagen) && (imagen !== "default-image.png")) {
                    fs.unlinkSync(path.join(__dirname, '..', '..', 'public', 'images', 'productos', imagen))
                }
            })
            /* return res.send(errors.mapped()) */
            return res.render('admin/crearProducto', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    editar: (req, res) => {
        let idParams = +req.params.id
        let categorias = db.Categorias.findAll()
        let marcas = db.Marcas.findAll()
        let producto = db.Productos.findOne({
            where: {
                id: idParams
            },
            include: [{
                all: true
            }]
        })
        Promise.all([categorias, marcas, producto])
            .then(([categorias, marcas, producto]) => {
                /* return res.send(imagenes) //Comprobar que esta llegando bien el elemento */
                return res.render('admin/editarProducto', {
                    producto,
                    categorias,
                    marcas
                })
            })
            .catch(error => res.send(error))
    },
    actualizar: (req, res) => {
        let errors = validationResult(req)
        if (req.fileValidationError) {
            let imagen = {
                param: 'imagen',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        }
        if (errors.isEmpty()) {
            const idParams = +req.params.id
            const { marca, titulo, categoria, precio, descuento, stock, descripcion } = req.body

            let producto = db.Productos.findOne({
                where: {
                    id: idParams
                },
                include: [{
                    all: true
                }]
            })
            let actualizacion = db.Productos.update({
                nombre: titulo,
                precio: +precio,
                descuento: +descuento,
                stock: +stock,
                descripcion,
                categorias_Id: categoria,
                marcas_Id: marca,
            }, {
                where: {
                    id: idParams
                }
            })

            Promise.all([producto, actualizacion])
                .then(([producto, actualizacion]) => {

                    let imagen1
                    let promesas = []

                    /* Imagen 1 */
                    /* Existe en la base de datos */
                    if (producto.imagenes[0].length !== 0) {
                        /* viene una imagen nueva */
                        if (!!req.files.imagen1) {
                            /* Guardo el nombre en una variable para despues borrarla */
                            imagen1 = producto.imagenes[0].nombre
                            /* La reemplazamos en la base de datos */
                            promesas.push(
                                db.Imagenes.update({
                                    nombre: req.files.imagen1[0].filename
                                }, {
                                    where: {
                                        id: producto.imagenes[0].id
                                    }
                                }))
                            /* Borramos la imagen anterior */
                            if (fs.existsSync(path.join(__dirname, '../../public/images/productos', imagen1))) {
                                fs.unlinkSync(path.join(__dirname, '../../public/images/productos', imagen1))
                            }
                        }
                    } else {
                        /* Si no existe la imagen en la base de datos, tenemos que crearla */
                        if (!!req.files.imagen1) {

                            /* Creamos la imagen en la base de datos */
                            promesas.push(
                                db.Imagenes.create({
                                    nombre: req.files.imagen1[0].filename,
                                    productosId: producto.id
                                }))
                        }
                    }
                    Promise.all(promesas)
                        .then(promesas => {
                            return res.redirect('/admin/list')
                        })
                })
                .catch(error => res.send(error))
        } else {
            return res.render('admin/crearProducto', {
                errors: errors.mapped(),
                old: req.body
            })
        }
    },
    eliminar: (req, res) => {
        let idParams = +req.params.id
        db.Productos.findOne({
            where: {
                id: idParams
            },
            include: [{
                all: true
            }]
        })
            .then(producto => {

                db.Historiales.create({
                    nombre: producto.nombre,
                    precio: producto.precio,
                    descuento: producto.descuento,
                    stock: producto.stock,
                    descripcion: producto.descripcion,
                    categoriasId: producto.categoriasId,
                    marcasId: producto.marcasId,
                })
                    .then(historial => {
                        let promesas = []

                        let imagen1 = db.HistorialImagenes.create({
                            nombre: producto.imagenes[0].nombre,
                            historialId: historial.id
                        })

                        Promise.all([imagen1,])
                            .then(([imagen1]) => {
                                db.Productos.destroy({
                                    where: {
                                        id: idParams
                                    }
                                })
                                    .then(producto => {
                                        return res.redirect('/admin/history')
                                    })
                            })
                    })
            })
            .catch(error => res.send(error))
    },

    historial: (req, res) => {
        db.Historiales.findAll({
            include: [{
                all: true
            }]
        })
            .then(historial => {
                /* return res.send(historial) */
                return res.render('admin/listaProductos', {
                    productos: historial,
                    redirection: "list"
                })
            })
    },
    restaurar: (req, res) => {
        let idParams = +req.params.id
        db.Historiales.findOne({
            where : {
                id :idParams
            },
            include : [{
                all : true
            }]
        })
        .then(historialProducto => {
            db.Productos.create({
                nombre: historialProducto.nombre,
                precio: historialProducto.precio,
                descuento: historialProducto.descuento,
                stock: historialProducto.stock,
                descripcion:historialProducto.descripcion,
                categoriasId: historialProducto.categoriasId,
                marcasId: historialProducto.marcasId,
            })
            .then(productoNuevo => {
                let imagen1 = db.Imagenes.create({
                    nombre: historialProducto.imagenes[0].nombre,
                    productoId: productoNuevo.id
                })
                
                Promise.all([imagen1])
                .then(([imagen1]) =>{
                    db.Historiales.destroy({
                        where : {
                            id : idParams
                        }
                    })
                    .then(eliminar => {
                        return res.redirect('/admin/list')
                    })
                })
            })
        })
        .catch(errores => res.send(errores))
    },}
    /* crash: (req, res) => {
        let idParams = +req.params.id

        db.Historiales.findOne({
            where : {
                id : idParams
            },
            include : [{
                all : true
            }]
        })
        .then(producto => {
            
            let ruta = (dato) => fs.existsSync(path.join(__dirname, '..', '..', 'public', 'images', 'productos', dato))
            producto.imagenes.forEach(imagen => {
                if (ruta(imagen.nombre) && (imagen.nombre !== "default-image.png")) {
                    fs.unlinkSync(path.join(__dirname, '..', '..', 'public', 'images', 'productos', imagen.nombre))
                }
            })

            db.Historiales.destroy({
                where : {
                    id : idParams
                }
            })
            .then(eliminar => {
                return res.redirect('/admin/list')
            })
        })
        .catch(errores => res.send(errores)} */