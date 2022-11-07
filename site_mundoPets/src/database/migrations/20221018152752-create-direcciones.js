'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Direcciones', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      ciudad: {
        type: Sequelize.STRING
      },
      provincia: {
        type: Sequelize.STRING
      },
      cod_postal: {
        type: Sequelize.STRING
      },
      numero: {
        type: Sequelize.INTEGER
      },
      calle: {
        type: Sequelize.STRING
      },
      usuarios_id: {
        type: Sequelize.INTEGER,
        references : {
          model : {
            tableName : "Usuarios",
          },
          key : "id"
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
    await queryInterface.dropTable('Direcciones');
  }
};