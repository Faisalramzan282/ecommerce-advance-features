const db = require('../../models');
const storeSetup = db.StoreSetup;
const getProfile =async (req, res) =>{
   console.log("req.body is ", req.body);
   const seller_id = req.headers['x-seller-id'];
   try {
      const storeData = await storeSetup.findOne({
         where:{
            seller_id:seller_id
         }
      })
      const {storeName, storeDescription, profileUrl} = storeData
      const storeInfo = {
         storeName: storeName,
         storeDescription: storeDescription,
         profileUrl:profileUrl
      }
      return  res.status(200).send({data:storeInfo })
   } catch (error) {
      return  res.status(500).send({data:error })
   }
}
module.exports = {getProfile}