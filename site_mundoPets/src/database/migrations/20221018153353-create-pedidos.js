'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pedidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      Usuarios_id: {
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName:'Usuarios',
            
          },
          key:'id'
        }
      },
      Carritos_id: {
        type: Sequelize.INTEGER,
        references:{
          model:{
            tableName:'Carritos',
            
          },
          key:'id'
        }
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Pedidos');
  }
};