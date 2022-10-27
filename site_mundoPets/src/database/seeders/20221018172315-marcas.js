'use strict';

/** @type {import('sequelize-cli').Migration} */
let listado = ['Royal Canin','Agility','VitalCan','Excellent','Cat Selection','Infinity','Pro Plan','Dog Selection','Eukanuba','Biopet']

let marcas = listado.map(marca => {
  let elemento = {
    nombre: marca,
    createdAt:new Date,
    updatedAt:new Date
  }
  return elemento
})

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Marcas', marcas, {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Marcas', null, {});
  }
};
