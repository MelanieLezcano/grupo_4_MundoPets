const fs = require('fs')
const path = require('path')
const { validationResult } = require('express-validator')
let db = require('../database/models')

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
                    redirection: "historial"// fijarse que nombre va
                })
            })
        /*  return res.render('admin/listaProductos',{ //viejo
             productos,
             redirection: "historial"
         }) */
    },
    crear: async (req, res) => {
        /* return res.render('admin/crearProducto')  */ //viejo
        let categorias = await db.Categorias.findAll()
        let subCategorias = await db.SubCategorias.findAll()
        let marcas = await db.Marcas.findAll()

        try {
            return res.render('admin/crearProducto', {
                categorias,
                marcas,
                subCategorias
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

            let { Categoria, Subcategoria, Marca, Titulo, Precio, Descuento, Descripcion, Stock } = req.body

            db.Productos.create({
                categorias_id: +Categoria,
                subcategorias_id: +Subcategoria,
                titulo: Titulo,
                marcas_id: +Marca,
                precio: +Precio,
                descuento: +Descuento,
                descripcion: Descripcion,
                stock: +Stock,
                imagen: req.file ? req.file.filename : 'default-image.png',
            })

                .then(productoNuevo => {
                   
                    return res.redirect('/admin/lista')
                    /* if (req.files) {
                        let img = req.files.map(imagen => {
                            let nuevo = {
                                nombre: imagen.filename,
                                productosId: productoNuevo.id
                            }
                            return nuevo

                        })
                        db.Imagenes.bulkCreate(img)
                            .then(imagenes => {
                                return res.redirect('/admin/lista')
                            })
                    } else {
                        db.Imagenes.create({
                            nombre: 'default-image.png',
                            productos_Id: productoNuevo.id
                        })
                            .then(imagenes => {
                                return res.redirect('/admin/lista')
                            })
                    } */
                })
                .catch(error => res.send(error))
        } else {
            let ruta = (dato) => fs.existsSync(path.join(__dirname, '..', '..', 'public', 'img', dato))
            if (req.file) {
                
                    if (ruta(req.file.filename) && (req.file.filename !== "default-image.png")) {
                        fs.unlinkSync(path.join(__dirname, '..', '..', 'public', 'img',req.file.filename ))
                    }
                
            }
            let categorias = db.Categorias.findAll()
            let subCategorias = db.SubCategorias.findAll()
            let marcas = db.Marcas.findAll()
            Promise.all([categorias,subCategorias,marcas])
            .then(([categorias,subCategorias,marcas])=> {
               return res.render('admin/crearProducto', {
                errors: errors.mapped(),
                old: req.body,categorias,subCategorias,marcas
            })
            })
            
        }
    },
    editar: (req, res) => {/* 
        db.Productos.findAll()
        .then((marcas) => {
            return res.send(marcas)
       }).catch((err) => {
        res.send(err)
       }); */

        let idParams = +req.params.id
        let categorias = db.Categorias.findAll()
        let subCategorias = db.SubCategorias.findAll()
        let marcas = db.Marcas.findAll()
        let producto = db.Productos.findOne({
            where: {
                id: idParams
            },
            include: [{
                all: true
            }]
        })

        Promise.all([categorias, subCategorias, marcas, producto])
            .then(([categorias,subCategorias, marcas, producto]) => {

                return res.render('admin/editarProducto', {
                    producto,
                    categorias,
                    subCategorias,
                    marcas
                })
            })
            .catch(error => res.send(error))
    },
    actualizar: (req, res) => {
        console.log(req.body);
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
            const { Marca, Titulo, Categoria, Subcategoria, Precio, Descuento, Stock, Descripcion } = req.body

            let producto = db.Productos.findOne({
                where: {
                    id: idParams
                },
                include: [{
                    all: true
                }]
            })
           

            let actualizacion = db.Productos.update({
                categorias_id: +Categoria,
                subcategorias_id: +Subcategoria,
                titulo: Titulo,
                marcas_id: +Marca,
                precio: +Precio,
                descuento: +Descuento,
                descripcion: Descripcion,
                stock: +Stock,
            }, {
                where: {
                    id: idParams
                }
            })

            Promise.all([producto, actualizacion])
                .then(([producto, actualizacion]) => {

                    let imagen1
                    let promesas = []

                    if (producto.imagen[0].length !== 0) {

                        if (!!req.files.imagen1) {

                            imagen1 = producto.imagen[0].nombre

                            promesas.push(
                                db.Imagenes.update({
                                    nombre: req.files.imagen1[0].filename
                                }, {
                                    where: {
                                        id: producto.imagen[0].id
                                    }
                                }))
                            /* Borramos la imagen anterior */
                            if (fs.existsSync(path.join(__dirname, '..', '..', 'public', 'img', imagen1))) {
                                fs.unlinkSync(path.join(__dirname, '..', '..', 'public', 'img', imagen1))
                            }
                        }
                    } else {

                        if (!!req.files.imagen1) {


                            promesas.push(
                                db.Imagenes.create({
                                    nombre: req.files.imagen1[0].filename,
                                    productos_id: producto.id
                                }))
                        }
                    }
                    Promise.all(promesas)
                        .then(promesas => {
                            return res.redirect('/admin/lista')
                        })
                })
                .catch(error => res.send(error))
        } else {
            let marcas = []
            let categorias = []
            let subCategorias = []
            
            return res.render('admin/crearProducto', {
                errors: errors.mapped(),
                old: req.body,
                marcas,
                categorias,
                subCategorias
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
                    categorias_id: producto.categorias_id,
                    subcategorias_id: producto.subcategorias_id,
                    titulo: producto.titulo,
                    marcas_id: marcas_id,
                    precio: producto.precio,
                    descuento: producto.descuento,
                    descripcion: producto.descripcion,
                    stock: producto.stock,
                })
                    .then(historial => {
                        let promesas = []

                        let imagen1 = db.HistorialImagenes.create({
                            nombre: producto.imagen[0].nombre,
                            historial_id: historial.id
                        })

                        Promise.all([imagen1,])
                            .then(([imagen1]) => {
                                db.Productos.destroy({
                                    where: {
                                        id: idParams
                                    }
                                })
                                    .then(producto => {
                                        return res.redirect('/admin/historial')
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
                    redirection: "lista"
                })
            })
    },
    restaurar: (req, res) => {
        let idParams = +req.params.id
        db.Historiales.findOne({
            where: {
                id: idParams
            },
            include: [{
                all: true
            }]
        })
            .then(historialProducto => {
                db.Productos.create({
                    titulo: historialProducto.titulo,
                    precio: historialProducto.precio,
                    descuento: historialProducto.descuento,
                    stock: historialProducto.stock,
                    descripcion: historialProducto.descripcion,
                    categorias_id: historialProducto.categorias_id,
                    subcategorias_id: historialProducto.categorias_id,
                    marcas_id: historialProducto.marcas_id,
                })
                    .then(productoNuevo => {
                        let imagen1 = db.Imagenes.create({
                            nombre: historialProducto.imagen[0].nombre,
                            producto_id: productoNuevo.id
                        })

                        Promise.all([imagen1])
                            .then(([imagen1]) => {
                                db.Historiales.destroy({
                                    where: {
                                        id: idParams
                                    }
                                })
                                    .then(eliminar => {
                                        return res.redirect('/admin/lista')
                                    })
                            })
                    })
            })
            .catch(errores => res.send(errores))
    }
}

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