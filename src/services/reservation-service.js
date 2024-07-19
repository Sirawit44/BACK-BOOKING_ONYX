const prisma = require("../models/prisma");

const reservationService ={}

reservationService.createReservation = (data) => prisma.reservation.create({data});

reservationService.findReservation = (userId) => prisma.reservation.findMany({
  where:{
    userId
  },
  include:{
    user:{
      select:{
        firstName:true,
        lastName:true
      },
    },
    room:{
      select:{
        roomTypeId:true,
        branchId:true,
        branch:{select:{
          name:true,
          location:true,
        }},
      },
    },
    payments:{select:{paymentStatus:true}}
  }
});

reservationService.findRoomUnique = (id) =>prisma.reservation.findUnique({
  where:{id}
})

reservationService.cancelRoomById = (id) => prisma.reservation.delete({
  where:{id},
})

reservationService.updateReservation = (data, reservationId) => prisma.reservation.update({
  where:{
    id: reservationId
  },
  data : data
}
)


module.exports = reservationService;


