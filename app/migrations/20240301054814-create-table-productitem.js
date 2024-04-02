"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("ProductItem", {
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
      uColorId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Color",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      fOriginalPrice: {
        type: Sequelize.FLOAT,
      },
      fSalePrice: {
        type: Sequelize.FLOAT,
      },
      fTax: {
        type: Sequelize.FLOAT,
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
    await queryInterface.dropTable("ProductItem");
  },
};
