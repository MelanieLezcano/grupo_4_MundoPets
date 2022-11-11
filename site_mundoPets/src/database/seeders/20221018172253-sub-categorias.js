'use strict';

let subcategorias = ['juguetes','alimento']
    
subcategorias = subcategorias.map(categoria => {
  let elemento = {
    nombre: categoria, 
    banner: 'imagenpordefecto.png',
    createdAt:new Date,
    updatedAt: new Date
  }
  return elemento
} )
module.exports = {
  async up (queryInterface, Sequelize) {
    
      await queryInterface.bulkInsert('SubCategorias', subcategorias, {});
    
  },

  async down (queryInterface, Sequelize) {
   
      await queryInterface.bulkDelete('SubCategorias', null, {});
     
  }
};
