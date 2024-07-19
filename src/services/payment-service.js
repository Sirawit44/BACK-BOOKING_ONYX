const prisma = require("../models/prisma");

const paymentService = {}

paymentService.createPayment = (data) => prisma.payments.create({data});
// data = {ImageSlip : input.ImageSlip[0].path}

// paymentService.findPayment


paymentService.updatePayment =(id,data) => prisma.payments.update({
  where:{
    id
  },
  data
})



module.exports = paymentService;