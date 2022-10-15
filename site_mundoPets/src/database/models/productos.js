
const { Model } =require('sequelize')

module.exports = (sequelize, DataTypes) => {

    class Productos extends Model {}

    Productos.init({
        titulo: DataTypes.STRING,
        precio: DataTypes.INTEGER,
        descuento: DataTypes.INTEGER,
        descripcion: DataTypes.STRING,
        stock: DataTypes.INTEGER,
        subcategorias_id: DataTypes.INTEGER,
        marcas_id: DataTypes.INTEGER
    },{
        sequelize,
        modelName: 'Productos',
    })
    return Productos
}