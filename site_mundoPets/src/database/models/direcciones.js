const { Model } =require('sequelize')

module.exports = (sequelize, DataTypes) => {

    class Direcciones extends Model {}

    Direcciones.init({
        ciudad: DataTypes.STRING,
        provincia: DataTypes.STRING,
        cod_postal: DataTypes.INTEGER,
        numero: DataTypes.INTEGER,
        calle: DataTypes.STRING,
        usuarios_id: DataTypes.INTEGER
    },{
        sequelize,
        modelName: 'Direcciones',
    })
    return Direcciones
}