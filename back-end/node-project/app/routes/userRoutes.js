const userController = require('../controllers/userData');
const {authenticateSeller} = require('../controllers/authenticateSeller');
const {authenticateUser} = require('../controllers/authenticateUser');
const {storeSetup} = require('../controllers/storeSetup');
const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage(),
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
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
router.post('/store-setup', upload.single('logo'), storeSetup);
module.exports = router;