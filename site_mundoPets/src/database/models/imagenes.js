const { Model } =require('sequelize')

module.exports = (sequelize, DataTypes) => {

    class Imagenes extends Model {}

    Imagenes.init({
        nombre: DataTypes.STRING,
        productos_id: DataTypes.INTEGER
    },{
        sequelize,
        modelName: 'Imagenes',
    })
    return Imagenes
}