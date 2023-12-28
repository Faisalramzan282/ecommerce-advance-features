const { DataTypes } = require('sequelize');
const OrderItem = require('./orderItem');
const User = require('./user');
module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define('Order', {
    order_id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true
    },
    status: {
      type: DataTypes.ENUM('Pending', 'Processing', 'Shipped', 'Delivered'),
      allowNull: false
    },
    total: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    }
  }, {
    freezeTableName: true
  });
  Order.associate = (models) => {
    Order.belongsTo(models.User, { foreignKey: 'user_id' });
    Order.hasMany(models.OrderItem, { foreignKey: 'order_id' });
  };
  return Order;
};