'use strict';

let roles = ['administrador','usuario']

let todosLosRoles = roles.map( elemento => {
  return {
    nombre: elemento,
    createdAt: new Date,
    updatedAt: new Date,
  }
});

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Roles', todosLosRoles, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, {});
  }
};
