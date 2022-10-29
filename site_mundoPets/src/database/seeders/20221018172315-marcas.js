let inventario = ['Royal Canin','Agility','VitalCan','Excellent','Cat Selection','Infinity','Pro Plan','Dog Selection','Eukanuba','Biopet']

let marcas = inventario.map(marca => {
  let elemento = {
    nombre: marca,
   /*  createdAt:new Date,
    updatedAt:new Date  */
  }
  return elemento
})

module.exports = {
  async up (queryInterface, Sequelize) {
   
      await queryInterface.bulkInsert('marcas', marcas, {});
    
  },

  async down (queryInterface, Sequelize) {
    
      await queryInterface.bulkDelete('marcas', null, {});
     
  }
};