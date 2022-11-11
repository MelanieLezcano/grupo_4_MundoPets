'use strict';

let marca = ['Royal Canin','Agility','VitalCan','Excellent','Cat Selection','Infinity','Pro Plan','Dog Selection','Eukanuba','Biopet']

let x = [ {
  nombre : 'Royal Canin',
  createdAt:new Date,
  updatedAt: new Date
},
{
  nombre:'Agility',
  createdAt:new Date,
  updatedAt: new Date
},
{
  nombre:'VitalCan',
  createdAt:new Date,
  updatedAt: new Date
},
{
  nombre:'Excellent',
  createdAt:new Date,
  updatedAt: new Date
},
{
  nombre:'Cat Selection',
  createdAt:new Date,
  updatedAt: new Date
},
{
  nombre:'Infinity',
  createdAt:new Date,
  updatedAt: new Date
},
{
  nombre:'Pro Plan',
  createdAt:new Date,
  updatedAt: new Date
},
{
  nombre:'Dog Selection',
  createdAt:new Date,
  updatedAt: new Date
},
{
  nombre:'Eukanuba',
  createdAt:new Date,
  updatedAt: new Date
},
{
  nombre:'Biopet',
  createdAt:new Date,
  updatedAt: new Date
}
]

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Marcas', x, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Marcas', null, {});
  }
};
