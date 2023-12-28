module.exports = {
  development: {
  dialect: 'mysql',
  username: 'admin', 
  password: 'admiN@123',
  url: 'mysql://admin:admiN@123@localhost:3306/ecommerce',
  database: 'ecommerce',
  port: 3306,
  },
  test: {
    dialect: 'mysql',
    username: 'admin', 
    password: 'admiN@123',
    url: 'mysql://admin:admiN@123@localhost:3306/ecommerce',
    database: 'ecommerce',
    port: 3306,
  },
  production: {
    dialect: 'mysql',
    username: 'admin', 
    password: 'admiN@123',
    url: 'mysql://admin:admiN@123@localhost:3306/ecommerce',
    database: 'ecommerce',
    port: 3306,
  },
}