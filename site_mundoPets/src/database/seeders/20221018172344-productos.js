'use strict';

let listado = require('../../data/productos.json')

let listadoCategorias = ["Perro","Gato"]
let listadosubCategorias = ["juguetes","alimentos"]
let marcas = ['Royal Canin','Agility','VitalCan','Excellent','Cat Selection','Infinity','Pro Plan','Dog Selection','Eukanuba','Biopet']

let productos = []

listado.forEach(producto => {
  let categoria
  let marca
  
  listadoCategorias.forEach((categoriaLista,index) => {
    if (categoriaLista === producto.categoria) {
        return categoria = index + 1
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
    subcategorias_id: 1,
    categorias_id: categoria,
    marcas_id: marca,
    createdAt:new Date,
    updatedAt:new Date
  }
  productos.push(nuevo)
})

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
