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
        as: 'productosSub',
        foreignKey: 'subcategorias_id'
      }),
      Productos.hasMany(models.Imagenes,{
        as: 'productosImagenes',
        foreignKey: 'productos_id'
      })
    }
  }
  Productos.init({
    titulo: DataTypes.STRING,
    precio: DataTypes.INTEGER,
    descuento: DataTypes.INTEGER,
    descripcion: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    subcategorias_id: DataTypes.INTEGER,
    marcas_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Productos',
  });
  return Productos;
};