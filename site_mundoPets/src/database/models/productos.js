'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Productos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Productos.hasMany(models.Carritos,{
        as: 'productoCarrito',
        foreignKey: 'productos_id'
      }),
      Productos.belongsTo(models.Marcas,{
        as: 'productosMarca',
        foreignKey: 'marcas_id'
      }),
      Productos.belongsTo(models.SubCategorias,{
        as: 'subcategoria',
        foreignKey: 'subcategorias_id'
      }),
      Productos.belongsTo(models.Categorias,{
        as: 'categoria',
        foreignKey: 'categorias_id'
      }) 
    }
  }
  Productos.init({
    titulo: DataTypes.STRING,
    precio: DataTypes.INTEGER,
    descuento: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    imagen: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    subcategorias_id: DataTypes.INTEGER,
    categorias_id: DataTypes.INTEGER,
    marcas_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Productos',
  });
  return Productos;
};