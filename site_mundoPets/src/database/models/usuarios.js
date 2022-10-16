const { Model } =require('sequelize')

module.exports = (sequelize, DataTypes) => {

    class Usuarios extends Model {}

    Usuarios.init({
        nombre: DataTypes.STRING,
        apellido: DataTypes.STRING,
        email: DataTypes.STRING,
        contraseña: DataTypes.STRING,
        contacto: DataTypes.STRING,
        ciudad: DataTypes.STRING,
        genero: DataTypes.INTEGER,
        direccion: DataTypes.STRING,
        imagen:DataTypes.STRING,
        roles_id: DataTypes.INTEGER
    },{
        sequelize,
        modelName: 'Usuarios',
    })
    return Usuarios
}