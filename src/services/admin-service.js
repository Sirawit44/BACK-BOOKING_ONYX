const prisma = require("../models/prisma");

prisma
adminService={}

adminService.getAllReservation =() => prisma.reservation.findMany({
  select:{
    user:{
      select:{
        firstName:true,
        lastName:true,
      }
    },
    room:{
      select:{
        roomTypeId:true,
        roomNumber:true,
        branchId:true,
        branch:{select:{
          name:true,
          location:true,
        }},
      },
    },
    payments:{
      select: {
        id:true,
        paymentStatus: true,
        imageSlip:true,
      },
    },
    userId:true,
    roomId:true,
    bookingDate:true,
    checkInDate:true,
    totalPrice:true,
    checkOutDate:true,
  }
});

module.exports = adminService;