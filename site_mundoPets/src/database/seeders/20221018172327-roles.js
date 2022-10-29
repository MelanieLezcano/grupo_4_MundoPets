'use strict';

let representacion = ['Administrador','Usuario',]

let roles = representacion.map(rol => {
  let elemento = {
    nombre: rol,
    createdAt:new Date,
    updatedAt:new Date 
  }
  return elemento
})
module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('roles', roles, {});
    
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.bulkDelete('roles', null, {});
     
  }
};

