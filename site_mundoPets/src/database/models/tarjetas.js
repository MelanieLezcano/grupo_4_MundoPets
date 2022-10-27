'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Tarjetas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Tarjetas.belongsTo(models.Usuarios,{
        as: 'tarjetasUsuario',
        foreignKey: 'Usuarios_id'
      })
    }
  }
  Tarjetas.init({
    numero_tarjeta: DataTypes.STRING,
    Usuarios_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Tarjetas',
  });
  return Tarjetas;
};