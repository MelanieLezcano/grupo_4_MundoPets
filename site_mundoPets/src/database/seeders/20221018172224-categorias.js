'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
   
    let categoria = ['Perro','Gato']
    
      let x = [ {
        nombre:'Perro',
        createdAt:new Date,
        updatedAt: new Date
       /*  banner:'no se', */
      },
      {
        nombre:'Gato',
        createdAt:new Date,
        updatedAt: new Date
       /*  banner:'no se', */
      }
    ]
   
     await queryInterface.bulkInsert('Categorias',x, {});
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Categorias', null, {});
  }
};
