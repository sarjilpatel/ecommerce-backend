"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("User", {
      id: {
        type: Sequelize.UUID,
        primaryKey: true,
        defaultValue: Sequelize.UUIDV4,
      },
      vName: {
        type: Sequelize.STRING,
      },
      vEmail: {
        type: Sequelize.STRING,
      },
      vPassword: {
        type: Sequelize.STRING,
      },
      vImage: {
        type: Sequelize.STRING,
      },
      eRole: {
        type: Sequelize.ENUM("admin", "manager", "user"),
        defaultValue: "user",
      },
      Phone: {
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
    await queryInterface.dropTable("User");
  },
};
