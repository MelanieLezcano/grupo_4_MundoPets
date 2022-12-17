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
                return res.render('admin/listaProductos', {
                    productos,
                })
            })

    },
    crear: async (req, res) => {
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
        }
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
                })
        } else {
            return res.redirect('/admin/crear')
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
            .then(([categorias, subCategorias, marcas, producto]) => {

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

            db.Productos.update({
                categorias_id: +Categoria,
                subcategorias_id: +Subcategoria,
                titulo: Titulo,
                marcas_id: +Marca,
                precio: +Precio,
                descuento: +Descuento,
                descripcion: Descripcion,
                stock: +Stock,
                imagen: req.file ? req.file.filename : 'default-image.png',
            }, {
                where: {
                    id: idParams
                }
            })
                .then((producto) => {
                    return res.redirect('/productos/detalle/' + idParams)
                })
                .catch(error => res.send(error))
        } else {

            return res.render('admin/editar' + idParams)
        }
    },
    eliminar: (req, res) => {
        let idParams = +req.params.id
        db.Productos.destroy({
            where: {
                id: idParams
            },
        })
            .then(producto => {
                return res.redirect('/admin/lista')
            })
    },

    historial: (req, res) => {
    },
    restaurar: (req, res) => {
    },
}