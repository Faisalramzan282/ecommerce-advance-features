const { nanoid } = require('nanoid');

module.exports = (sequelize, DataTypes) => {
  const userInfo = sequelize.define('userInfo', {
    userId: {
      type: DataTypes.STRING,
      primaryKey: true,
      defaultValue: () => nanoid(12),
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});

  return userInfo;
};
