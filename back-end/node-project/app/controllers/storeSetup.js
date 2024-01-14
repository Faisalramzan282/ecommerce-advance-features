const myKey = require("../../myKey.json");
const config = require("../config/config");
const path = require("path");
const { Storage } = require("@google-cloud/storage");
const db = require("../models");
const storage = new Storage({
  projectId: config.projectId,
  keyFilename: path.join(__dirname, "../../myKey.json"),
});
const bucket = storage.bucket(config.bucketName);
const storeSetup = async (req, res) => {
  const sellerId = req.body.seller_id;
  try {
    if (req.file) {
      if (req.file.size > 5 * 1024 * 1024) {
        return res
          .status(400)
          .json({ error: "Profile image should be 5MB or less." });
      }
      if (!sellerId) {
        return res
          .status(400)
          .json({ status: 400, error: "Unauthorized Access" });
      }
      const storeProfileFolder = "storeProfile";
      const sellerProfileFolder = `${storeProfileFolder}/${sellerId}`;
      //file existed, delete it
      const [files] = await bucket.getFiles({
        prefix: sellerProfileFolder,
      });
      await Promise.all(files.map((file) => file.delete()));
      const blob = bucket.file(
        `${sellerProfileFolder}/${req.file.originalname}`);
      const existingStore = await db.StoreSetup.findOne({
        where: { seller_id: sellerId },
      });
      const blobStream = blob.createWriteStream({
        resumable: false,
        metadata: {
          contentType: req.file.mimetype
        },
      });
      blobStream.on("error", (err) => {
        console.error("Error uploading file:", err);
        res.status(500).json({ error: "Error uploading file" });
      });
      blobStream.on("finish", async () => {
      const profileImage = `https://storage.googleapis.com/${config.bucketName}/${blob.name}`;
        if (existingStore) {
          await existingStore.update({
            storeName: req.body.storeName,
            storeDescription: req.body.storeDescription,
            contact: req.body.contact,
            address: req.body.address,
            seller_id: sellerId,
            profileUrl: profileImage
          });
        } else {
          await db.StoreSetup.create({
            seller_id: sellerId,
            storeName: req.body.storeName,
            storeDescription: req.body.storeDescription,
            contact: req.body.contact,
            address: req.body.address,
            seller_id: sellerId,
            profileUrl:profileImage
          });
        }
        res.status(200).send({ message: "setup store Info"});
      });
      blobStream.end(req.file.buffer);

    } else {
      res.status(400).json({ message: "No file provided" });
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};
module.exports = { storeSetup };