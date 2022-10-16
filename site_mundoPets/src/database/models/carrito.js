const { Model } =require('sequelize')

module.exports = (sequelize, DataTypes) => {

    class Carritos extends Model {}

    Carritos.init({
        productos_id: DataTypes.INTEGER,
        usuarios_id: DataTypes.INTEGER
    },{
        sequelize,
        modelName: 'Carritos',
    })
    return Carritos
}