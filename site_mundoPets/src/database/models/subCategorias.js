const { Model } =require('sequelize')

module.exports = (sequelize, DataTypes) => {

    class SubCategorias extends Model {}

    SubCategorias.init({
        nombre: DataTypes.STRING,
        banner: DataTypes.STRING,
        categorias_id: DataTypes.INTEGER
    },{
        sequelize,
        modelName: 'SubCategorias',
    })
    return SubCategorias
}