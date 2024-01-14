const {DataTypes} = require('sequelize');
module.exports = (sequelize, Sequelize) => {
    const ProductImage = sequelize.define('ProductImage', {
    id:{
        type: DataTypes.INTEGER,
        unique: true,
        primaryKey: true,
        autoIncrement: true
    },
    prod_url:{
        type: DataTypes.TEXT,
        allowNull: false,
    }
    },
    {
        freezeTableName: true, 
    })
    return ProductImage;
};