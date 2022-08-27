
const fs = require('fs')
const path = require('path')
const productos = require('../data/productos.json')
const historial = require('../data/historial.json')
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
    crear: (req, res) => {
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
            precio: Precio,
            descuento: Descuento,
            descripcion: Descripcion,
            stock: Stock,
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
    actualizar: (req, res) => {
        return res.render('admin/crearProducto')
    },
    eliminar: (req,res) =>{
       /*  return res.render('admin/listaProductos')
       // revisar */
    },
    historial: (req, res) => {

        return res.render('admin/listaProductos', {
            productos: historial,
            redirection: "lista"
        })
    },
    update: (req, res) => {
        const idParams = +req.params.id
        /* const { Marca} */
         productos.forEach(producto => {
            if (producto.id === idParams) {

            }
         })
    },
    destroy: (req, res) => {
        idParams = +req.params.id
        let 
    },
}

