'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('StoreSetup', 'user_id');
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('StoreSetup', 'user_id', {
      type: Sequelize.UUID,
      references: {
        model: 'User',
        key: 'user_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },
};
