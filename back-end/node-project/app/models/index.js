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
// db.Order = require("./order.js")(sequelize, Sequelize);
// db.Review = require("./review.js")(sequelize, Sequelize);
// db.Product = require("./product.js")(sequelize, Sequelize);
// db.OrderItem = require("./orderItem.js")(sequelize, Sequelize);
//user associations
// db.User.hasMany(db.Order, { foreignKey: 'user_id' });
// db.User.hasMany(db.Review, { as: 'Reviews', foreignKey: 'user_id' });
// db.User.hasMany(db.Product, { as: 'addProducts', foreignKey: 'user_id' });
    //order associations
// db.Order.belongsTo(db.User, { foreignKey: 'user_id' });
// db.Order.hasMany(db.OrderItem, { foreignKey: 'order_id' });
     //review associations
// db.Review.belongsTo(db.User, { foreignKey: 'user_id' });
// db.Review.belongsTo(db.Product, { foreignKey: 'product_id' });
// db.Product.hasMany(db.Review, { foreignKey: 'product_id' });
// db.Product.hasMany(db.OrderItem, { foreignKey: 'product_id' });
// db.Product.belongsTo(db.User, { foreignKey: 'user_id' });
// db.OrderItem.belongsTo(d{"message":"b.Order, { foreignKey: 'order_id' });
// db.OrderItem.belongsTo(db.Product, { foreignKey: 'product_id' });

module.exports = db;