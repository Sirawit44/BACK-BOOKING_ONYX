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
    id:true,
    userId:true,
    roomId:true,
    bookingDate:true,
    checkInDate:true,
    totalPrice:true,
    checkOutDate:true,
  }
});

// adminService.updateReservation = ()=> prisma.reservation.update({where})
// adminService.deleteUser = (id) => prisma.reservation.delete({where:id})
module.exports = adminService;