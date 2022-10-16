const { Model } =require('sequelize')

module.exports = (sequelize, DataTypes) => {

    class Marcas extends Model {}

    Marcas.init({
        nombre: DataTypes.STRING,
    },{
        sequelize,
        modelName: 'Marcas',
    })
    return Marcas
}