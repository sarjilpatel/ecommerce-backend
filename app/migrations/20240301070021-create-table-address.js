"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Address", {
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
      vFirstName: {
        type: Sequelize.STRING,
      },
      vLastName: {
        type: Sequelize.STRING,
      },
      vPhone: {
        type: Sequelize.STRING,
      },
      vPincode: {
        type: Sequelize.STRING,
      },
      vState: {
        type: Sequelize.STRING,
      },
      vCity: {
        type: Sequelize.STRING,
      },
      vLine1: {
        type: Sequelize.STRING,
      },
      vLine2: {
        type: Sequelize.STRING,
      },
      eAddressType: {
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
    await queryInterface.dropTable("Address");
  },
};
