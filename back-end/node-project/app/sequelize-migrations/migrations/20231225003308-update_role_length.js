// In the generated migration file (update_role_length.js)
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('User', 'role', {
      type: Sequelize.STRING(255),
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('User', 'role', {
      type: Sequelize.STRING, // Revert to the original type
    });
  },
};