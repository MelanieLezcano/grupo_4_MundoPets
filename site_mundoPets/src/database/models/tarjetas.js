const { Model } =require('sequelize')

module.exports = (sequelize, DataTypes) => {

    class Tarjetas extends Model {}

    Tarjetas.init({
        numero_tarjetas: DataTypes.INTEGER,
        usuarios_id: DataTypes.INTEGER
    },{
        sequelize,
        modelName: 'Tarjetas',
    })
    return Tarjetas
}