const { DataTypes } = require('sequelize');
const Order = require('./order');
const Product = require('./product');
module.exports = (sequelize, Sequelize) => {
  const OrderItem = sequelize.define('OrderItem', {
    orderItem_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      unique: true,
      primaryKey: true,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    }
  }, {
    freezeTableName: true
  });
  OrderItem.associate = (models)=>{
    OrderItem.belongsTo(models.Order, { foreignKey: 'order_id' });
    OrderItem.belongsTo(models.Product, { foreignKey: 'product_id' });
  }
  return OrderItem;
};