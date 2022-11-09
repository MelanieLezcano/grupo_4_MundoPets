'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedidos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Pedidos.belongsTo(models.Usuarios,{
        as: 'pedidoUser',
        foreignKey: 'Usuarios_id'
      }),
      Pedidos.belongsTo(models.Carritos,{
        as: 'pedidoCart',
        foreignKey: 'Carritos_id'
      })
    }
  }
  Pedidos.init({
    Usuarios_id: DataTypes.INTEGER,
    Carritos_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Pedidos',
    timestamps: true
  });
  return Pedidos;
};