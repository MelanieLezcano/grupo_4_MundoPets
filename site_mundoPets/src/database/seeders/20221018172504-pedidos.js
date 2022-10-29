'use strict';


module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('pedidos', pedidos, {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('pedidos', null, {});
    
  }
};

