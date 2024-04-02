"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Review", {
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
      uProductItemId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "ProductItem",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      vTagline: {
        type: Sequelize.STRING,
      },
      fRatings: {
        type: Sequelize.FLOAT,
      },
      vComment: {
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
    await queryInterface.dropTable("Review");
  },
};
