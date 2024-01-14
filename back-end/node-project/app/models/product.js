const { DataTypes } = require('sequelize');
module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define('Product', {
    product_id: {
      type: DataTypes.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
      allowNull: false,
      unique: true,
    },
    productName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    productDescription: {
      type: DataTypes.TEXT,
      allowNull: false, 
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false, 
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    weightUnit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    length: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    lengthUnit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    height: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    heightUnit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    width: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: true,
    },
    widthUnit: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    isProductPhysical: {
      type: DataTypes.BOOLEAN,
      allowNull: false, 
      defaultValue: false, 
    },
    
  }, {
    freezeTableName: true,
    
  });
 
  return Product;
};