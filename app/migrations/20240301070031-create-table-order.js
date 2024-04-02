"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Order", {
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
      uShippingAddressId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Address",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      uBillingAddressId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Address",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      uDiscountCodeId: {
        type: Sequelize.UUID,
        references: {
          model: "DiscountCode",
          key: "id",
        },
        onDelete: "SET NULL",
      },
      fTotal: {
        type: Sequelize.FLOAT,
      },
      fTotalDiscount: {
        type: Sequelize.FLOAT,
      },
      uShippingTypeId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "ShippingType",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      fGrandTotal: {
        type: Sequelize.FLOAT,
      },
      vPaymentId: {
        type: Sequelize.STRING,
      },
      ePaymentStatus: {
        type: Sequelize.ENUM("pending", "completed", "cancelled", "failed"),
      },
      eOrderStatus: {
        type: Sequelize.ENUM("processing", "intransit", "delivered"),
      },
      dDeliveredAt: {
        type: Sequelize.DATE,
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
    await queryInterface.dropTable("Order");
  },
};
