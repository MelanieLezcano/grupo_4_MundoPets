'use strict';


module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('marcas', [], {});
    
  },

  async down (queryInterface, Sequelize) {
   
      await queryInterface.bulkDelete('marcas', null, {});
    
  }
};
