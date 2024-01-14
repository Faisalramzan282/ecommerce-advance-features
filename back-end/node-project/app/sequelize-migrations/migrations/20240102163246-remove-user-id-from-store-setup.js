module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('StoreSetup', 'seller_id', {
      type: Sequelize.UUID,
      references: {
        model: 'User',
        key: 'user_id',
      },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('StoreSetup', 'seller_id');
  },
};