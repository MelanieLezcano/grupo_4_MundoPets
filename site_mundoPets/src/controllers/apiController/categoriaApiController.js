let db = require('../../database/models');
const { Op } = require("sequelize");


module.exports = {
    categoria : (req,res) => {
     
        db.Categorias.findAll()
        
    
        .then(categoria =>{
            let response = {
                status : 200,
                meta : {
                   total:categoria.length,
                   link :`${req.protocol}://${req.get('host')}${req.originalUrl}`
                },
                data : categoria
            }
            return res.status(200).json(response)
        })
        .catch(error => res.status(500).json('Error al acceder a la información'))
    }
}