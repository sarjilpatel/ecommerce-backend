"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Cart", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      uUserId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "User",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      fTotal: {
        type: Sequelize.FLOAT,
      },
      uDiscountCodeId: {
        type: Sequelize.UUID,
        references: {
          model: "DiscountCode",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      fTotalDiscount: {
        type: Sequelize.FLOAT,
      },
      uShippingTypeId: {
        type: Sequelize.UUID,
        references: {
          model: "ShippingType",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      fTotalTax: {
        type: Sequelize.FLOAT,
      },
      fGrandTotal: {
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
    await queryInterface.dropTable("Cart");
  },
};
