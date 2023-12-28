module.exports = ({
  dialect: 'mysql',
  username: 'admin', 
  password: 'admiN@123',
  host: 'localhost',
  database: 'ecommerce',
  port: 3306,
  dialectOptions: {
    options: {
      trustServerCertificate: true,
    },
  },
  pool: {
    max: 20,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  JWT_SECRET_KEY:'8Zz5tw0Ionm3XPZZfN0NOml3z9FMfmpgXwovR9fp6ryDIoGRM8EPHAB6iHsc0fb',
  saltRounds : 12
});