const { DataTypes, Sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
// const config = require('../config/config');
module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define('User', {
    user_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    profileImage: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    role: {
      type: DataTypes.STRING,
      allowNull:false,
      len: {
        args: [0, 10],
        msg: 'Role length must be between 0 and 10 characters',
      },
    }
  }, {
  freezeTableName: true, 
  });
  // User.associate = (models) => {
  //   // User.hasMany(models.Order, { foreignKey: 'user_id' });
  //   // User.hasMany(models.Review, { as: 'Reviews', foreignKey: 'user_id' });
  //   User.hasMany(models.Product, { as: 'addProducts', foreignKey: 'user_id' });
  // };
  return User;
};