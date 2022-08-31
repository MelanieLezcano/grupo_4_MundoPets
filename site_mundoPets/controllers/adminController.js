const fs = require('fs')
const path = require('path')
const productos = require('../data/productos.json')
const historial = require('../data/historial.json')
 const { validationResult } = require('express-validator') 
/* const categorias = require('../data/historial.json') */

/* const redirection = require('../data/historial.json') */
/* PARA USAR AL MOMENTO DE CREAR EL JSON CON LOS PRODUCTOS */
const guardar = (dato) => fs.writeFileSync(path.join(__dirname, '../data/productos.json')
    , JSON.stringify(dato, null, 4), 'utf-8')
const guardarHistorial = (dato) => fs.writeFileSync(path.join(__dirname, '../data/historial.json')
    , JSON.stringify(dato, null, 4), 'utf-8')


module.exports = {
    lista: (req,res) => {
        return res.render('admin/listaProductos',{
            productos,
            redirection: "historial"
        })
    },
    crear: (req,res) => {
        return res.render('admin/crearProducto')
    },

    nuevo: (req, res) => {
        let {Categoria,Subcategoria,Marca,Titulo,Precio,Descuento,Descripcion,Stock} = req.body

        let productoNuevo = {
            id : productos[productos.length - 1].id + 1 ,
            categoria: Categoria,
            subcategoria: Subcategoria,
            marca: Marca,
            titulo: Titulo,
            precio: +Precio,
            descuento: +Descuento,
            descripcion: Descripcion,
            stock: +Stock,
            imagenes: [
                "default-image.png",
                "",
                "",
                ""
            ]
    }
    productos.push(productoNuevo)
    guardar(productos)
    res.redirect('/admin/lista')
},
    
    editar: (req, res) => {
        let categorias = ['gato', 'perro']
        id = +req.params.id
        let producto = productos.find((elemento) => {
            return elemento.id == id
        })
        /* return res.send(producto) Comprobar que esta llegando bien el elemento*/
        return res.render('admin/editarProducto', {
            producto,
            categorias
        })

    },
    actualizar: (req,res) => {
         idParams = +req.params.id
        const { Marca, Titulo, Categoria, Precio, Descuento, Stock, Descripcion } = req.body
        let errors = validationResult(req)
        if (req.fileValidationError) {
            let imagen = {
                param: 'imagen',
                msg: req.fileValidationError,
            }
            errors.errors.push(imagen)
        }
        if (errors.isEmpty()) {
        productos.forEach(producto => {
            if (producto.id === idParams) {
                producto.marca = Marca
                producto.titulo = Titulo
                producto.categorias = Categoria
                producto.precio = +Precio
                producto.descuento = +Descuento
                producto.stock = +Stock
                producto.descripcion = Descripcion
            }
        })
        
        guardar(productos)
        return res.redirect('/admin/lista')

    }
},

    historial: (req, res) => {
        return res.render('/admin/lista', {
            productos: historial,
            redirection: "lista"
        })
    },
    eliminar: (req,res) =>{
        /* return res.render('admin/listaProductos') */// revisar
        idParams = +req.params.id
        let productoAEliminar = producto.find((elemento) => {
            return elemento.id == idParams
        })

        historial.push(productoAEliminar)
        guardarHistorial(historial)

        let productosModificados = productos.filter(producto => producto.id !== idParams)
        guardar(productosModificados)

        return res.redirect('/admin/lista')
    },
    restaurar: (req, res) => {
        idParams = +req.params.id

        let productoParaRestaurar = historial.find((elemento) => {
            return elemento.id == idParams
        })

        productos.push(productoParaRestaurar)
        guardar(productos)

        let historialModificado = historial.filter(producto => producto.id !== idParams)
        guardarHistorial(historialModificado)

        return res.redirect('/admin/lista')
    }
    }