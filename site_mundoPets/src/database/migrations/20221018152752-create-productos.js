'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Productos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      titulo: {
        type: Sequelize.STRING
      },
      precio: {
        type: Sequelize.INTEGER
      },
      descuento: {
        type: Sequelize.INTEGER
      },
      descripcion: {
        type: Sequelize.STRING
      },
      imagen: {
        type: Sequelize.STRING
      },
      stock: {
        type: Sequelize.INTEGER
      },
      subcategorias_id: {
        type: Sequelize.INTEGER,
        references: {
          model: { 
            tablename :'Subcategorias'
          },
          key: 'id'
        }
      },
      categorias_id: {
        type: Sequelize.INTEGER,
        references: {
          model: { 
            tablename : 'Categorias'
          },
          key: 'id'
        }
      },
      marcas_id: {
        type: Sequelize.INTEGER,
        references: {
          model: { 
            tablename : 'Marcas'
          },
          key: 'id'
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
    await queryInterface.dropTable('Productos');
  }
};