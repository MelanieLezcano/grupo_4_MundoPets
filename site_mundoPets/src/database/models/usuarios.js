'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Usuarios.belongsTo(models.Roles,{
        as: 'usuariosRol',
        foreignKey: 'roles_id'
      }),
      Usuarios.hasMany(models.Tarjetas,{
        as: 'usuariosTarjetas',
        foreignKey: 'Usuarios_id'
      }),
      Usuarios.hasMany(models.Carritos,{
        as: 'usuariosCarts',
        foreignKey: 'usuarios_id'
      }),
      Usuarios.hasMany(models.Pedidos,{
        as: 'usuariosPedidos',
        foreignKey: 'Usuarios_id'
      }),
      Usuarios.hasMany(models.Direcciones,{
        as: 'usuarioDirecciones',
        foreignKey: 'usuarios_id'
      })
    }
  }
  Usuarios.init({
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    email: DataTypes.STRING,
    contraseña: DataTypes.STRING,
    contacto: DataTypes.INTEGER,
    ciudad: DataTypes.STRING,
    genero: DataTypes.STRING,
    direccion: DataTypes.STRING,
    imagen: DataTypes.STRING,
    roles_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Usuarios',
  });
  return Usuarios;
};