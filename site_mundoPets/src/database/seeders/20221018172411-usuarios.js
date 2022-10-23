'use strict';

let listado = require('../../data/usuarios.json')

let usuarios = listado.map(usuario => {
  let elemento = {
    nombre: usuario.name,
    apellido: usuario.apellido,
    genero: usuario.genero,
    email: usuario.email,
    contrasenia: usuario.pass,
    direccion: null,
    ciudad: usuario.ciudad,
    codigoPostal: null,
    imagen: usuario.imagen,
    numeroTarjeta: null,
    rolId: usuario.rol === 'admin' ? 1 : 2,
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
