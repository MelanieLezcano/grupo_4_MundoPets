'use strict';

<<<<<<< HEAD:site_mundoPets/src/database/seeders/20221102171942-direcciones.js
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
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
=======
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
  },
>>>>>>> f8aef6a86b44aa42f3197017ceb701666f193a67:site_mundoPets/src/database/seeders/20221018172224-categorias.js
};
