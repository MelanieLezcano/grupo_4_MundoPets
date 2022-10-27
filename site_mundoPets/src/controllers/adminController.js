const fs = require('fs')
const path = require('path')
const { validationResult } = require('express-validator')
let db = require('../database/models')


 /* const productsFilePath = path.join(__dirname, '../data/productsDataBase.json'); */


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
   
    nuevo: (req,res) => {
        
        let errors = validationResult(req)
         if(req.fileValidationError){
            let Imagenes = {
                param: 'Imagenes',
                msg: req.fileValidationError,
            }
            errors.errors.push(Imagenes)
        }  /* return res.send(errors) */
        
          if(errors.isEmpty()){
            let Imagenes = req.files.map(imagen => {
                return imagen.filename
            })

            let {Categoria,Subcategoria,Marca,Titulo,Precio,Descuento,Descripcion,Stock} = req.body 
            
              let productoNuevo = {
                  id: productos[productos.length - 1].id + 1, 
                  
                  categoria:Categoria,
                  subcategoria:Subcategoria,
                  titulo:Titulo,
                  marca:Marca,
                  precio:+Precio,
                  descuento:+Descuento,
                  descripcion:Descripcion,
                  stock:+Stock,
                  imagenes : req.file ? req.file.filename : 'default-image.png',
              } 
       
              productos.push(productoNuevo)
              guardar(productos)   
      
             
               res.redirect('/admin/lista') 
             }else{  
               
                return res.render('admin/crearProducto',{
                errors : errors.mapped(),
                old: req.body 
               })  
             }   
            
        },
        editar: (req, res) => {
            let categorias = ['Gato', 'Perro'] 
            id = +req.params.id
            let producto = productos.find((elemento) => {
                return elemento.id == id
            })
           
            return res.render('admin/editarProducto', {
                producto,
                categorias 
               
            })
        },

        actualizar:(req,res) =>{
           const idParams = +req.params.id
            const {Categoria,Subcategoria,Marca,Titulo,Precio,Descuento,Descripcion,Stock} = req.body 
            let errors = validationResult(req)
          if(req.fileValidationError){
            let Imagenes = {
                param : 'Imagenes',
                msg: req.fileValidationError,
            }
            errors.errors.push(Imagenes)
         } 
         if(errors.isEmpty()){ 

             productos.forEach(producto => {
                if (producto.id === idParams) {
                    producto.categoria = Categoria
                    producto.subcategoria = Subcategoria
                    producto.titulo = Titulo
                    producto.marca = Marca
                    producto.precio = +Precio
                    producto.descuento = +Descuento
                    producto.descripcion = Descripcion
                    producto.stock = +Stock
                  
                }
            })
            guardar(productos) 
            return res.redirect('/admin/lista')
        }else {
             /* return res.send(errors.mapped()) */
             return res.render('admin/crearProducto', {
                errors: errors.mapped(),
                old: req.body
            })
        }

        },

       eliminar: (req,res) =>{
            idParams = +req.params.id
    
            let productoAEliminar = productos.find((elemento) => {
                return  elemento.id == idParams
            })
          historial.push(productoAEliminar)
          guardarHistorial(historial)
  
          let productosModificados = productos.filter(producto => producto.id !== idParams)
          guardar(productosModificados )
          
              return res.redirect('/admin/historial')
          },
           
          historial: (req, res) => {
              return res.render('admin/listaProductos', {
                  productos: historial,
                  redirection: "lista"
              })
          }, 
          restaurar : (req,res) =>{
              idParams = +req.params.id
      
              let productoARestaurar = historial.find((elemento) => {
                  return  elemento.id == idParams
              })
              productos.push(productoARestaurar)
                  guardar(productos)
                  let historialModificado = historial.filter(producto => producto.id !== idParams)
                  guardarHistorial(historialModificado )
                  return res.redirect('/admin/lista')
          }
      
      }
         