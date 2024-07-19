const express = require("express");
const upload = require("../middlewares/upload");
const paymentController = require("../controllers/payment-controller");
const { validateSlipImage } = require("../middlewares/validator");

const paymentRouter = express.Router();

// create
paymentRouter.post("/",
  upload.fields([{ name: "imageSlip", maxCount: 1 }]),
  validateSlipImage,
  paymentController.createPayment
);

// get
// paymentRouter.get('/', /*validatecreateBranch */ branchController.getAllBranch)

// update
// paymentRouter.patch('/update',
//   upload.fields([
//     {name: 'imageHeader', maxCount:1},
//     {name: 'imageMap', maxCount: 1},
//     {name: 'branchId', maxCount:1}
//   ]),
//   validateImageHeaderOrMapHeader,
//   branchController.updateImageHeaderOrImageMap
// );

module.exports = paymentRouter;
