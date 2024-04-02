"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("CartItem", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      uCartId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Cart",
          key: "id",
        },
        onDelete: "CASCADE",
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
      iQuantity: {
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
    await queryInterface.dropTable("CartItem");
  },
};
