'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubCategorias extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      SubCategorias.belongsTo(models.Categorias,{
        as: 'category',
        foreignKey: 'categorias_id'
      }),
      SubCategorias.hasMany(models.Productos,{
        as: 'subProducto',
        foreignKey: 'subcategorias_id'
      })
    }
  }
  SubCategorias.init({
    nombre: DataTypes.STRING,
    banner: DataTypes.STRING,
    categorias_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'SubCategorias',
  });
  return SubCategorias;
};