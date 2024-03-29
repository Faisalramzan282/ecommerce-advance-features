const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const getProfile = require('../controllers/seller/getProfile');
const {getAllProducts} = require('../controllers/seller/getAllProducts');
const { addProduct } = require('../controllers/seller/addProduct');
const {getSpecificProduct} = require("../controllers/seller/getSpecificProduct");
const {deleteProduct} = require("../controllers/seller/deleteProduct");
const {updateProduct} = require("../controllers/seller/updateProduct");
router.get('/get-profile', getProfile.getProfile);
router.post('/add-product/:sellerId', upload.single('product_img'), addProduct);
router.get('/get-all-products', getAllProducts);
router.get('/get-specific-product', getSpecificProduct);
router.delete('/delete-product/:seller_id', deleteProduct);
router.put('/update-product',upload.single('product_img'), updateProduct);
module.exports = router;