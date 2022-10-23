'use strict';

let listado = require('../../data/usuarios.json')

let usuarios = listado.map(usuario => {
  let elemento = {
    nombre: usuario.name,
    apellido: usuario.apellido,
    email: usuario.email,
    contraseña: usuario.pass,
    /* contacto: usuario.contacto, */
    ciudad: usuario.ciudad,
    genero: usuario.genero,
    direccion: null,
    imagen: usuario.imagen,
    /* numeroTarjeta: null, */
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
