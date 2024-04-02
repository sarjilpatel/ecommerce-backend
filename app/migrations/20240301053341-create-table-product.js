"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Product", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      uSubCategoryId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Subcategory",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      uBrandId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Brand",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      vProductName: {
        type: Sequelize.STRING,
      },
      tProductDescription: {
        type: Sequelize.TEXT,
      },
      fModelHeight: {
        type: Sequelize.FLOAT,
      },
      vModelWearing: {
        type: Sequelize.STRING,
      },
      vCareInstructions: {
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
    await queryInterface.dropTable("Product");
  },
};
