const { Model } =require('sequelize')

module.exports = (sequelize, DataTypes) => {

    class Pedidos extends Model {}

    Pedidos.init({
        usuarios_id: DataTypes.INTEGER,
        carritos_id: DataTypes.INTEGER
    },{
        sequelize,
        modelName: 'Pedidos',
    })
    return Pedidos
}