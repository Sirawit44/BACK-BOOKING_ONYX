const authService = require("../services/auth-service")
const paymentService = require("../services/payment-service")
const reservationService = require("../services/reservation-service")
const adminController = {}
const adminService = require("../services/admin-service")

adminController.allCustomers = async (req,res,next)=>{
  try {
    const getAllCustomers = await adminService.getAllReservation()
    console.log(getAllCustomers)
    res.status(200).json(getAllCustomers)
  } catch (error) {
    next(error)
  }
}

adminController.updatePayment = async (req,res,next)=>{
  try {
    const paymentId = +req.params.paymentId
    const body = req.body
    console.log(body,paymentId)
    const data = await paymentService.updatePayment(paymentId,body);
    return res.json(body)
    
  } catch (error) {
    next(error)
  }
}

// adminController.updateReservation = async (req,res,next)=>{
//   try {
//     let roomId;
//     const ad = await adminService.getAllReservation(roomId)
//     console.log(ad)
//     const deletes = await adminService.deleteUser(ad.userId)
//   } catch (error) {
//     next(error)
//   }
// }


module.exports = adminController;