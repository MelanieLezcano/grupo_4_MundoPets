'use strict';

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

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Usuarios', usuarios, {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Usuarios', null, {});
  }
};
