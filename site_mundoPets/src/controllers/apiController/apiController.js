let db = require('../../database/models');
const { Op } = require("sequelize");


module.exports = {
    nuestrosProductos : (req,res) => {
        db.Productos.findAll()
        .then(productos =>{
            let response = {
                status : 200,
                meta : {
                   total:productos.length,
                   link :`${req.protocol}://${req.get('host')}${req.originalUrl}`
                },
                data : productos
            }
            return res.status(200).json(response)
        })
        .catch(error => res.status(500).json('Error al acceder a la información'))
    }
}