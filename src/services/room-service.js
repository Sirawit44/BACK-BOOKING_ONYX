const { RoomStatus } = require("@prisma/client");
const prisma = require("../models/prisma");

const roomService ={}


//create
roomService.createRoom = (data) => prisma.room.create({data});

//find ===> check
roomService.findAvailableRoom = (roomTypeId, branchId) => prisma.room.findMany({
  where:{
  AND : [{ roomTypeId : roomTypeId, availableRoom: 'TRUE', branchId: branchId}]
  },take : 1
});

// get
roomService.getAllRoom =(data, availableRoom) => prisma.room.findMany({
  where:{
    availableRoom : availableRoom
  }
});

// update
roomService.updateReservation = (data, reservationId) => prisma.room.update({
  where:{
    id: reservationId
  },
  data : data
});

roomService.unAvailableRoom = (roomId, RoomStatus) => prisma.room.update({
  where:{
    id:roomId
  },
  data:{
    availableRoom:RoomStatus
  }

});


module.exports = roomService;
