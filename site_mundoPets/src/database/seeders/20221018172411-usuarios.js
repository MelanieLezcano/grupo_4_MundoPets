'use strict';

<<<<<<< HEAD
/** @type {import('sequelize-cli').Migration} */
=======
let listado = require('../../data/usuarios.json')

let usuarios = listado.map(usuario => {
  let elemento = {
    nombre: usuario.name,
    apellido: usuario.apellido,
    email: usuario.email,
    contraseña: usuario.pass,
    contacto: 125263,
    ciudad: usuario.ciudad,
    genero: usuario.genero,
    imagen: usuario.imagen,
    roles_id: usuario.rol === 'admin' ? 1 : 2,
    createdAt:new Date,
    updatedAt:new Date
  }
  return elemento
})

>>>>>>> 7e8d2a59c0430c67f31390c26c1b0d90216a6208
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
