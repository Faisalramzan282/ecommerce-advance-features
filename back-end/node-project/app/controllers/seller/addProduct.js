const db = require("../../models");
const myKey = require("../../../myKey.json");
const config = require("../../config/config");
const { Storage } = require("@google-cloud/storage");
const path = require('path');
const storage = new Storage({
    projectId:config.projectId,
    keyFilename: path.join(__dirname, "../../../myKey.json"),
})
const bucket = storage.bucket(config.bucketName);
const addProduct =async (req, res) =>{
console.log("req.body in ", req.body);
const seller_id = req.params.sellerId;
const price = parseFloat(req.body.price);
const quantity = parseFloat(req.body.quantity);
let width, length, height, weight, widthUnit, lengthUnit, heightUnit, weightUnit;
let {productName, productDescription, category, isPhysicalProduct} = req.body;
let isPhysicalProductBoolean = Boolean(parseInt(isPhysicalProduct));
if (isPhysicalProductBoolean === true) {
    width = parseFloat(req.body.width);
    length = parseFloat(req.body.length);
    height = parseFloat(req.body.height);
    weight = parseFloat(req.body.weight);
    widthUnit = req.body.widthUnit;
    lengthUnit = req.body.lengthUnit;
    heightUnit = req.body.heightUnit;
    weightUnit = req.body.weightUnit;
} else {
    width = null;
    length = null;
    height = null;
    weight = null;
    widthUnit = '';
    lengthUnit = '';
    heightUnit = '';
    weightUnit = '';
}
    try {
        if (req.file) {
          if (req.file.size > 5 * 1024 * 1024) {
            return res
              .status(400)
              .json({ error: "Product image should be 5MB or less." });
          }
          if(!seller_id){
            return res
              .status(400)
              .json({ status: 400, error: "Unauthorized Access" });
          }
          const existingProduct = await db.Product.findOne({
            where: {
                seller_id: seller_id,
                productName: productName,
            },
        });
        if (existingProduct) {
            return res.status(400).json({ error: `${productName } already existed!` });
        }
          const newProduct = await db.Product.create({
            productName:productName,
            productDescription:productDescription,
            category:category,
            price:price, 
            quantity:quantity,
            width:width, 
            widthUnit:widthUnit, 
            length:length, 
            lengthUnit:lengthUnit,
            height : height, 
            heightUnit: heightUnit, 
            weight:weight, 
            weightUnit:weightUnit,
            seller_id:seller_id, 
            isProductPhysical: isPhysicalProductBoolean
          });
          const product_id = newProduct.product_id;
          const sellerProductsFolder = "sellerProducts";
          const sellerProductsPath = `${sellerProductsFolder}/${seller_id}/${product_id}`;
          const blob = bucket.file(`${sellerProductsPath}/${req.file.originalname}`);
          const blobStream = blob.createWriteStream({
            resumable: false,
            metadata: {
              contentType: req.file.mimetype
            },
          });
          const prodImageUrl = `https://storage.googleapis.com/${config.bucketName}/${blob.name}`;
          const newProductImage = await db.ProductImage.create({
            productId: product_id,
            prod_url: prodImageUrl,
          });
          blobStream.on("error", (err) => {
            db.Product.destroy({
              where: { product_id: newProduct.product_id },
            });
            db.ProductImage.destroy({
              where:{productId:newProduct.product_id}
            })
            return res.status(500).json({ error: "Error uploading Product image" });
          });
          blobStream.on("finish", async () => { 
            return res.status(200).send({ message: "Product added successfully"});
          });
          blobStream.end(req.file.buffer);
        }
      } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: "Internal server error" });
      }
}
module.exports = {addProduct}