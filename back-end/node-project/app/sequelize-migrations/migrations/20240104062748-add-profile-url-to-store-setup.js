// In the generated migration file (e.g., <timestamp>-add-profile-url-to-store-setup.js)

"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("StoreSetup", "profileUrl", {
      type: Sequelize.STRING,
      allowNull: false,
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("StoreSetup", "profileUrl");
  },
};
