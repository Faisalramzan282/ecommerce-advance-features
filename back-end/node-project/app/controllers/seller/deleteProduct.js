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
const deleteProduct = async (req, res) => {
  const seller_id = req.params.seller_id;
  const product_id = req.body.product_id;
  try {
   if(product_id){
   const sellerProductsFolder = "sellerProducts";
   const sellerProductsPath = `${sellerProductsFolder}/${seller_id}/${product_id}`;
   await deleteFilesInDirectory(sellerProductsPath);
    const specificSubdirectoryPath = `${sellerProductsFolder}/${seller_id}/${product_id}`;
   console.log("before delete files")
    await bucket.deleteFiles({
     prefix: specificSubdirectoryPath
   });
   
   // console.log("product NAme ", subDir);
   console.log("after delete files")
   await db.Product.destroy({
       where: { product_id: product_id, seller_id: seller_id },
     });
    console.log("before delete productImage table")
   await db.ProductImage.destroy({
       where: { productId: product_id },
     });
   // console.log("product NAme ", productName);
    console.log("after delete product image table ");
    return res.status(200).json({status:200, data:"product deleted successfully"});
   }
  }catch (error) {
    if (error.name === "SequelizeConnectionRefusedError") {
      return res.status(500).json({ error: "Database connection refused." });
    } 
    else {
      return res.status(500).json({ error: "Internal server error" });
    }
  }
};
async function deleteFilesInDirectory(directoryPath){
  console.log("inside deleteFilesInDirectory");
  const [files] = await bucket.getFiles({
    prefix: directoryPath
  });
  const deletePromises = files.map((file) => {
    return file.delete();
  });
  await Promise.all(deletePromises);
}
module.exports = { deleteProduct };