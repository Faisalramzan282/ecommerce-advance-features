module.exports = ({
  dialect: 'mysql',
  username: '', 
  password: '',
  host: 'localhost',
  database: '',
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
  JWT_SECRET_KEY:'',
  saltRounds : 12
});
