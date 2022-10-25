'use strict';

/** @type {import('sequelize-cli').Migration} */
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
    let categoria = ['Perro','Gato']
    
      let x = [ {
        nombre:'Perro',
        banner:'no se',
      /*   createdAt:new Date,
        updatedAt: new Date */
      },
      {
        nombre:'Gato',
        banner:'no se',
       /*  createdAt:new Date,
        updatedAt: new Date */
      }
    ]
   
     await queryInterface.bulkInsert('Categorias',x, {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Categorias', null, {});
  }
};
