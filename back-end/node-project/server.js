const express = require('express');
const userRoutes = require('./app/routes/userRoutes');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }))
const port = 3060;
const db = require("./app/models");
db.sequelize.sync({  force: false })
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((err) => {
    console.error('Error synchronizing database: ', err);
  });
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Ecommerce Application!" });
});
app.use('/user', userRoutes); //route will be user/register
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});