'use strict';

const { categoria } = require("../../controllers/indexController");

let category = ['Perro','Gato']

let categorias = category.map(categoria => {
  let elemento = {
    nombre:categoria
  }
  return elemento
})
module.exports = {
 /*  async up (queryInterface, Sequelize) {
    
    let categoria = ['Perro','Gato']
    
      let x = [ {
        nombre:'Perro',
        banner:'no se',
        createdAt:new Date,
        updatedAt: new Date 
      },
      {
        nombre:'Gato',
        banner:'no se',
         createdAt:new Date,
        updatedAt: new Date 
      }
    ]
   
     await queryInterface.bulkInsert('Categorias',x, {});
  },

  async down (queryInterface, Sequelize) {
    
     await queryInterface.bulkDelete('Categorias', null, {});
  } */
  async up (queryInterface, Sequelize) {
   
    await queryInterface.bulkInsert('categorias', categorias, {});
  
},

async down (queryInterface, Sequelize) {
  
    await queryInterface.bulkDelete('categorias', null, {});
   
}

};
