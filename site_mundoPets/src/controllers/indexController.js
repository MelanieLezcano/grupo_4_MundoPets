let db = require('../database/models');
/* const productos = require('../database/models/productos'); */
const { Op } = require("sequelize");
/* let productos = require('../data/productos.json');  */

module.exports = {
    home: (req, res) => {
        db.Productos.findAll({
            include: [{ all: true }]
        })

            .then(productos => {
                /* return res.send(productos) */
                return res.render('home', {

                    productos
                });
            })
            .catch(error => res.status(500).send(error))
    },

    contacto: (req, res) => {
        return res.render('contacto')
    },
    nosotros: (req, res) => {
        return res.render('nosotros')
    },
/*     categoria: (req, res) => {
        let categoriaSeleccionada = req.params.categorias

        db.Categorias.findOne({
            where: {
                nombre: categoriaSeleccionada
            },
            include: [
                {
                    association: 'productos',
                    include: [{
                        all: true
                    }]
                }
            ]
        })
            .then(categorias => {

                return res.render('productos', {
                    categorias,
                })
            })
            .catch(error => res.send(error))
    }, */
    search: (req, res) => {

        let elemento = req.query.search

      /*  let resultados = productos.filter(producto => {
            return producto.marca === elemento || (producto.titulo.includes(elemento)) || (producto.descripcion.toLowerCase().includes(elemento.toLowerCase()))
        })
        return res.render('busqueda',
            {
                busqueda: elemento,
                resultados
            }),   */

        db.Productos.findAll({
            where: {
                [Op.or]: [
                    { titulo: { [Op.substring]: elemento } },
                    /* { marca: { [Op.substring]: elemento } } */
                ]
            },
            include:[
                {all:true}
            ]
        })
        .then((resultados) =>{
            return res.render('busqueda',
            {
                busqueda: elemento,
                resultados
            });
        })
        .catch(error => res.send(error))
        
    },


    nuestrosProductos: (req, res) => {
        db.Productos.findAll({
            include: [{ all: true }]
        })

            .then(productos => {
                /* return res.send(productos) */
                return res.render('nuestrosProductos', {

                    productos
                });
            })
            .catch(error => res.status(500).send(error))
    },

}










