'use strict';

let categoria = ['Perro','Gato']
    
      let x = [ {
        nombre:'Perro',
        banner:'no se',
        createdAt:new Date,
        updatedAt: new Date
      },
      {
        nombre:'Gato',
        banner:'no se',
        createdAt:new Date,
        updatedAt: new Date
      }
    ]

    module.exports = {
    async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Categorias',x, {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Categorias', null, {});
  }}
