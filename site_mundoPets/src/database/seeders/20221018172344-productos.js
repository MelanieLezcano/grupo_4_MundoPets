'use strict';

let listado = require('../../data/productos.json')

let listadoCategorias = ["Perro","Gato"]
let listadosubCategorias = ["juguetes","alimentos"]
let marcas = ['Royal Canin','Agility','VitalCan','Excellent','Cat Selection','Infinity','Pro Plan','Dog Selection','Eukanuba','Biopet']

let productos = []

listado.forEach(producto => {
  let categoria
  let subcategoria
  let marca
  
  listadoCategorias.forEach((categoriaLista,index) => {
    if (categoriaLista === producto.categoria) {
        return categoria = index + 1
    }
  });

  listadosubCategorias.forEach((subcategoriaLista,index) => {
    if (subcategoriaLista === producto.subcategoria) {
        return subcategoria = index + 1
    }
  });

  marcas.forEach((elemento,index) => {
    if ((elemento.toUpperCase()) === (producto.marca.toUpperCase())) {
        return marca = index + 1
    }
  });

  let nuevo = {
    titulo: producto.titulo,
    stock: producto.stock,
    precio: producto.precio,
    descuento: producto.descuento,
    descripcion: producto.descripcion,
    imagen: producto.imagenes[0],
    subcategorias_id: subcategoria,
    categorias_id: categoria,
    marcas_id: marca,
    createdAt:new Date,
    updatedAt:new Date
  }
  productos.push(nuevo)
})

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Productos', productos, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Productos', null, {});
  }
};
