const db = require("../models");
const User = db.User;
const { sequelize } = require("../config/config");
const bcrypt = require("bcrypt");
const config = require("../config/config");
const jwt = require("jsonwebtoken");
const authenticateSeller = async (req, res, next) => {
  console.log("req.body is ->", req.body);
  try {
    if (!req.body) {
      return res.status(400).send({
        message: "Bad Request",
      });
    }
    const { email, password, seller } = req.body;
    //means it is seller
    if(!email || !password){
      return res.status(401).json({status: 401, message:"Email/password required"});
    }
    if (seller && email && password){
      const viewUser =  await User.findOne({where: { email: email }});
      if(!viewUser){
        return res.status(401).json({ message: "User did not exist" });
      }
      if(viewUser){
      const passwordMatch = await bcrypt.compare(password, viewUser.password);
      if(passwordMatch)
      {
        await User.update({ role: 'user' }, { where: { user_id: viewUser.user_id } });
        const token =  jwt.sign(
                      {
                        user_id: viewUser.user_id,
                        email: viewUser.email,
                        role: "seller",
                      },
                      config.JWT_SECRET_KEY,
                      { expiresIn: "5d" }
                    );
        return res.status(200).json({status:200, message: "role updated successfully", user: viewUser, token: token });
      }
      else{
        return res.status(401).json({ message: "Incorrect password." });
      }
      }
    }
  } catch (error) {
    console.error("Error:", error);
    if (error.name === "SequelizeValidationError") {
      const validationErrors = error.errors.map((err) => ({
        field: err.path,
        message: err.message,
      }));
      res.status(400).send({
        message: "Validation error",
        errors: validationErrors,
      });
    } else {
      res.status(500).send({
        message:
          error.message || "Some error occurred while creating the user.",
      });
    }
  }
};
module.exports = {authenticateSeller}