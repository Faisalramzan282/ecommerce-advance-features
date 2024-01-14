const dbConfig = require("../config/config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.host,
  dialect: dbConfig.dialect,
  operatorsAliases: 0,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.User = require("./user.js")(sequelize, Sequelize);
db.StoreSetup = require("./store-setup.js")(sequelize, Sequelize);
db.Product = require("./product.js")(sequelize, Sequelize);
db.ProductImage = require("./productImage.js")(sequelize, Sequelize);
db.User.hasOne(db.StoreSetup, { foreignKey: "seller_id" });
db.StoreSetup.belongsTo(db.User, { foreignKey: "seller_id" });
db.User.hasMany(db.Product, {foreignKey:"seller_id"} );
db.Product.belongsTo(db.User,{foreignKey:"seller_id"} );
db.Product.hasMany(db.ProductImage, { foreignKey: 'productId' , onDelete: 'CASCADE'});
db.ProductImage.belongsTo(db.Product, { foreignKey: 'productId', onDelete: 'CASCADE' });
module.exports = db;