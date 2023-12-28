const { DataTypes } = require('sequelize');
const User = require('./user');
const Product = require('./product');
module.exports = (sequelize, Sequelize) => {
  const Review = sequelize.define('Review', {
    review_id: {
      type: DataTypes.INTEGER,
      unique: true,
      primaryKey: true,
      autoIncrement: true,
    },
    comment: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    rating: {
      type: DataTypes.ENUM('1', '2', '3', '4', '5'),
      allowNull: true,
    },
    averageRating: {
      type: DataTypes.DECIMAL(10, 1),
      allowNull: true,
    },
  }, {
    freezeTableName: true,
  });
  Review.associate = (models) => {
    Review.belongsTo(models.User, { foreignKey: 'user_id' });
    Review.belongsTo(models.Product, { foreignKey: 'product_id' });
  };
  return Review;
};