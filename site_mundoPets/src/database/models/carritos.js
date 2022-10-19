'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carritos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Carritos.belongsTo(models.Usuarios,{
        as: 'carritosUsuario',
        foreignKey: 'usuarios_id'
      }),
      Carritos.belongsTo(models.Productos,{
        as: 'carritosProducto',
        foreignKey: 'productos_id'
      }),
      Carritos.hasMany(models.Pedidos,{
        as: 'carritosPedidos',
        foreignKey: 'Carritos_id'
      })
    }
  }
  Carritos.init({
    productos_id: DataTypes.INTEGER,
    usuarios_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Carritos',
  });
  return Carritos;
};