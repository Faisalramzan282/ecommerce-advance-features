const userController = require('../controllers/userData');
const {authenticateSeller} = require('../controllers/authenticateSeller');
const {authenticateUser} = require('../controllers/authenticateUser');
const express = require('express');
const router = express.Router();
router.post("/register", userController.registerUser);
router.post('/authenticate', (req, res, next)=>{
  if(req.body.seller)
  {
    authenticateSeller(req, res);
  }
  else{
    authenticateUser(req, res);
  }
});
module.exports = router;