const { DataTypes } = require('sequelize');
const Review = require('./review');
const User = require('./user');
module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define('Product', {
    product_id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    specification: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    category: {
      type: DataTypes.ENUM(
        'Electronics',
        'ApparelAndFashion',
        'HomeAndLiving',
        'BeautyAndPersonalCare',
        'SportsAndOutdoors',
        'BooksAndMedia',
        'HealthAndWellness'
      ),
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageUrls: {
      type: DataTypes.JSON,
      allowNull: true,
    },
  }, {
    freezeTableName: true,
  });
  Product.beforeCreate((product) => {
    product.product_id = generateUniqueId();
  });
  Product.associate=(models)=>{
    // Product.hasMany(models.Review, { foreignKey: 'product_id' });
    // Product.hasMany(models.OrderItem, { foreignKey: 'product_id' });
    Product.belongsTo(models.User, { foreignKey: 'user_id' });
  }
  function generateUniqueId() {
    const currentDate = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const timestamp = new Date().getTime().toString();
    const randomComponent = Math.random().toString(36).slice(2, 10);
    return currentDate + '-' + timestamp + '-' + randomComponent;
  }
  return Product;
};