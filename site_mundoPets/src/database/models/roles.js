const { Model } =require('sequelize')

module.exports = (sequelize, DataTypes) => {

    class Roles extends Model {}

    Roles.init({
        nombre: DataTypes.STRING,
    },{
        sequelize,
        modelName: 'Roles',
    })
    return Roles
}