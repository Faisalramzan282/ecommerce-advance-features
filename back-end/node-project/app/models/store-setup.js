const { DataTypes, Sequelize } = require('sequelize');
const User = require('./user');
module.exports = (sequelize, Sequelize) => {
  const StoreSetup = sequelize.define('StoreSetup', {
    id: {
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    storeName:{
        type: DataTypes.STRING,
        allowNull: false,
    },
    storeDescription:{
        type: DataTypes.TEXT,
        allowNull:false
    },
    address:{
        type:DataTypes.STRING,
        allowNull:false
    },
    contact:{
        type:DataTypes.STRING,
        allowNull: false
    },
    seller_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'User',
          key: 'user_id',
        },
      }, 
    profileUrl:{
      type:DataTypes.TEXT,
      allowNull:false
    } 
  }, {
    freezeTableName: true,
  });
  return StoreSetup;
};