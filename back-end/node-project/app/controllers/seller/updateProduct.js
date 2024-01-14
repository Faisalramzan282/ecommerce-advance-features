const db = require('../../models');
const myKey = require("../../../myKey.json");
const config = require("../../config/config");
const { Storage } = require("@google-cloud/storage");
const path = require('path');
const storage = new Storage({
    projectId:config.projectId,
    keyFilename: path.join(__dirname, "../../../myKey.json"),
})
const bucket = storage.bucket(config.bucketName);
const updateProduct = async (req, res) => {
   // const product_id = req.body.product_id;
   const weight = parseFloat(req.body.weight);
   const length = parseFloat(req.body.length);
   const width = parseFloat(req.body.width);
   const height = parseFloat(req.body.height);
   const price = parseFloat(req.body.price);
   const quantity = parseInt(req.body.quantity);
   const seller_id = req.headers['seller_id'];
   const product_id = req.headers['product_id'];
   let {productName, productDescription, category, weightUnit, heightUnit, lengthUnit, widthUnit, isPhysicalProduct} = req.body;
   console.log("in req.body ", productName, productDescription, category, weightUnit, heightUnit, lengthUnit, widthUnit, isPhysicalProduct);
   console.log("req.body ", req.body);
   let isPhysicalProductBoolean = Boolean(parseInt(isPhysicalProduct));
   
   try {
      console.log("inside try block", isPhysicalProductBoolean)
      if(req.file){
         console.log("insde req.file if llop")
         if (req.file.size > 5 * 1024 * 1024) {
            return res.status(400).json({ error: "Product image should be 5MB or less."});
         }
      
      console.log("after req.file if llop")
      const sellerProductsFolder = "sellerProducts";
      const sellerProductsPath = `${sellerProductsFolder}/${seller_id}/${product_id}`;
      console.log("sellerProduct folder path ", sellerProductsPath);
      await bucket.deleteFiles({
         prefix: sellerProductsPath
       });
      
      console.log("after for loop");
      console.log("req.files  innnnnnn ", req.file);
      const blob = bucket.file(`${sellerProductsPath}/${req.file.originalname}`);
      const blobStream = blob.createWriteStream({
         resumable: false,
         metadata: {
             contentType: req.file.mimetype
         },
     });
      console.log('blob is ', blob.name);
      blobStream.setMaxListeners(30);
      const prodImageUrl = `https://storage.googleapis.com/${config.bucketName}/${blob.name}`;
      console.log("image url is ",prodImageUrl );
      blobStream.on("error", (err) => {
         console.log('error existineg      .....')
         return res.status(500).json({ error: "Error uploading Product image" });
      });
      blobStream.once("finish", async () => {
         console.log("inised finish tab....");
         try {
             const [updatedProduct] = await db.Product.update({
               productName, productDescription, category,price,quantity, 
               ...(isPhysicalProductBoolean
                  ? {
                        weight,
                        length,
                        width,
                        height,
                        weightUnit,
                        lengthUnit,
                        heightUnit,
                        widthUnit,
                    }
                  : {
                        weight: null,
                        length: null,
                        width: null,
                        height: null,
                        weightUnit: '',
                        lengthUnit: '',
                        heightUnit: '',
                        widthUnit: '',
                    }),
            },
                 {
                     where: {
                         product_id: product_id,
                         seller_id: seller_id,
                     },
                     // returning: true,
                 }
             );
             if (!updatedProduct) {
                 return res.status(404).json({ error: "Product not found" });
             }
             const [updatedProductImage] = await db.ProductImage.update(
                 {
                     prod_url : prodImageUrl
                 },
                 {
                  where: {
                      productId: product_id,
                  },
              }
             );
             return res.status(200).json({status:200, message: "Product Updated successfully", product: updatedProduct, image: updatedProductImage });
         } catch (updateError) {
             return res.status(500).json({ error: "Error updating product:" });
         }
     });
     blobStream.end(req.file.buffer);
   }
   }catch (error) {
      if (error.name === "SequelizeConnectionRefusedError") {
         return res.status(500).json({ error: "Database connection refused." });
      } else if (error.name === "SequelizeValidationError") {
         const validationErrors = error.errors.map(err => ({
            field: err.path, message: err.message, }));
         return res.status(400).json({ error: "Validation error", details: validationErrors });
      } else if (error.name === "SequelizeUniqueConstraintError") {
         return res.status(400).json({ error: "Unique constraint violation", details: error.fields });
      } else if (error.name === "SequelizeForeignKeyConstraintError") {
         return res.status(400).json({ error: "Foreign key constraint violation", details: error.fields });
      } else if (error.name === "SequelizeDatabaseError"){
         return res.status(500).json({ error: "Database error", details: error.parent });
      } else if (error.name === "SequelizeTimeoutError") {
         return res.status(500).json({ error: "Database operation timeout." });
      } else {
         return res.status(500).json({ error: "Internal server error" });
      }
   }
}
module.exports = { updateProduct };