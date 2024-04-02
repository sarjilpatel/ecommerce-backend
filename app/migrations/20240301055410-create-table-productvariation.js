"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ProductVariation", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      uProductItemId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "ProductItem",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      uSizeId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "SizeOption",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      uQuantityInStock: {
        type: Sequelize.INTEGER,
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
    await queryInterface.dropTable("ProductVariation");
  },
};
