"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Category", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      uGroupId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: "Group",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      vName: {
        type: Sequelize.STRING,
      },
      uSizeCategoryId: {
        type: Sequelize.UUID,
        allowNull: true,
        references: {
          model: "SizeCategory",
          key: "id",
        },
        onDelete: "CASCADE", // Modify as needed
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
    await queryInterface.dropTable("Category");
  },
};
