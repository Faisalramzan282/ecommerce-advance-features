const db = require("../../models");
const getSpecificProduct = async (req, res) =>{
    const seller_id = req.headers['seller_id'];
    const product_id = req.headers['product_id'];
    try {
        const productInfo = await db.Product.findOne({
            where: {
                product_id: product_id,
                seller_id:seller_id
              },
              attributes: [
                "product_id",
                "productName",
                "productDescription",
                "category",
                "price",
                "quantity",
                "height",
                "heightUnit",
                "width",
                "widthUnit",
                "length",
                "lengthUnit",
                "weight",
                "weightUnit",
              ],
              include: [
                {
                  model: db.ProductImage,
                  attributes: ["prod_url"],
                },
              ],
              raw: true,
        })
        const flattenedProductDetail = {};
        for (const key in productInfo) {
          if (key === 'ProductImages.prod_url') {
            flattenedProductDetail.productImage = productInfo[key]; 
          } else {
            flattenedProductDetail[key] = productInfo[key]; 
          }
      }
        if (productInfo) {
            const { product_id, productName, productDescription, category, price,quantity, weight, length, width, height, weightUnit, lengthUnit, heightUnit, widthUnit,productImage  } = flattenedProductDetail;
            const productDetails = {
              product_id,              
              productName,
              productDescription,
              category,
              price,
              quantity,
              weight: weight !== 0 ? `${weight}${weightUnit}` : undefined,
              height: height !== 0 ? `${height}${heightUnit}` : undefined,
              width : width !== 0? `${width}${widthUnit}` : undefined,
              length : length !==0 ? `${length}${lengthUnit}` : undefined,
              productImage
            };
            return res.status(200).json({status:200,productDetail:productDetails});
        }
        } catch (error) {
        if (error.name === "SequelizeConnectionRefusedError") {
            return res.status(500).json({ error: "Database connection refused." });
          } else {
            return res.status(500).json({ error: "Internal server error" });
          }
    }
}
module.exports = { getSpecificProduct };