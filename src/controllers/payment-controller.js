const fs = require("fs/promises");
const uploadService = require("../services/upload-service");
const { upload } = require("../services/upload-service");
const createError = require("../utils/createError");
const paymentService = require("../services/payment-service");

const paymentController = {};

paymentController.createPayment = async (req, res, next) => {
  try {
    console.log("createPayment")
    const input = req.files;
    const result = await uploadService.upload(req.files.imageSlip[0].path);
    const rs = await paymentService.createPayment({
      imageSlip: result,
      reservationId: +req.body.reservationId,
    });
    res.status(200).json({message: "success"});
  } catch (err) {
    next(err);
  } finally {
    if (req.files.imageSlip) {
      fs.unlink(req.files.imageSlip[0].path);
    }
  }
};

// paymentController.getAllBranch = async(req,res,next)=>{
//   try {
//   } catch (err) {
//     next(err)
//   }
// }

// paymentController.updateImageHeaderOrImageMap = async(req,res,next)=>{
//   try{
//   }catch(err){
//     next(err)
//   }
// };

module.exports = paymentController;
