const db = require("../../models");
const getAllProducts = async (req, res) => {
  const seller_id = req.headers["seller-id"];
  try {
    const products = await db.Product.findAll({
      where: {
        seller_id: seller_id,
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
    });
    if (products.length === 0) {
      return res
        .status(404)
        .json({ error: "No products found for the specified seller." });
    }
    const allProducts = products.map((product) => {
      return {
        ...product,
        productImage: product["ProductImages.prod_url"],
      };
    });
    res.status(200).json({ allProducts: allProducts, message:"products fetched successfully" });
  } catch (error) {
    if (error.name === "SequelizeConnectionRefusedError") {
      res.status(500).json({ error: "Database connection refused." });
    } else {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};
module.exports = { getAllProducts };