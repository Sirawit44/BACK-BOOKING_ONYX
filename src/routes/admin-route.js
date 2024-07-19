const express = require("express");
const adminController = require('../controllers/admin-controller')

const adminRouter = express.Router();

adminRouter.get("/allCustomer",adminController.allCustomers)
adminRouter.patch("/payment/:paymentId", adminController.updatePayment);


module.exports = adminRouter;
