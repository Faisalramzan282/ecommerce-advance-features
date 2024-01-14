const db = require("../models");
const { sequelize } = require('sequelize');
const bcrypt = require('bcrypt');
exports.registerUser = async (req, res) => {
  try {
    if(req.body.email == '' && req.body.password == '' && req.body.username){
     return res.status(400).send({
      message:"email or password or username can not be empty"
     })
    }
    if (!req.body) {
      return res.status(400).send({
        message: "Bad Request"
      });
    }
    if (!isValidEmail(req.body.email)) {
      return res.status(400).send({
        message: "Invalid email format"
      });
    }
    if (!isValidPassword(req.body.password)) {
      return res.status(400).send({
        message: "Password must start with an uppercase letter and be at least 8 characters long"
      });
    }
    if (!isValidUsername(req.body.username)) {
      return res.status(400).send({
        message: "Username must contain atleast one lowercase and one numeric"
      });
    }
    if(req.body.username){
      const userNameExisted = await db.User.findOne( {
        where: {username: req.body.username}
      })
      if(userNameExisted){
        return res.status(400).send({
          message:"username already existed"
        })
      }
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const createdUser = await db.User.create(
      { email: req.body.email, password: hashedPassword, username:req.body.username, role: 'user' });
    res.status(200).json({ status: 200, message: "User created successfully", data: createdUser });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const validationErrors = error.errors.map(err => ({
        field: err.path,
        message: err.message
      }));
      res.status(400).send({
        message: "Validation error",
        errors: validationErrors
      });
    } else if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).send({
        message: "User already existed",
        error: {
          field: error.fields[0],
          message: "Already exists in the database"
        }
      });
    } else {
      res.status(500).send({
        message: error.message || "Some error occurred while creating the user."
      });
    }
  }
};
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}
function isValidPassword(password) {
  const passwordRegex = /^(?=.*[A-Z]).{8,}$/;
  return passwordRegex.test(password);
}
function isValidUsername(username) {
  const usernameRegex = /^(?=.*[a-z])(?=.*[0-9])[a-z0-9]+$/;
  return usernameRegex.test(username);
}