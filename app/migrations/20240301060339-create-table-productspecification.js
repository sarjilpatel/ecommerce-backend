"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ProductSpecification", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      uProductId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Product",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      uSpecificationOptionId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "SpecificationOption",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      value: {
        type: Sequelize.STRING,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("ProductSpecification");
  },
};
