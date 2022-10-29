'use strict';


module.exports = {
  async up (queryInterface, Sequelize) {
   
     await queryInterface.bulkInsert('carritos', carritos, {});
    
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('carritos', null, {});
    
  }
};

