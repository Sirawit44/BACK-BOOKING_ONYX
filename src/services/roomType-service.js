const prisma = require("../models/prisma");

const roomTypeService = {};

roomTypeService.createRoomType = (data) => prisma.roomType.create({data});

roomTypeService.findRoomTypeByName = (typeName) => prisma.roomType.findFirst({
  where : {typeName : typeName}
});


roomTypeService.getAllRoomType = ()=> prisma.roomType.findMany();

roomTypeService.getRoomTypeById = (id) => prisma.roomType.findUnique({
  where:{ id : id }
});

roomTypeService.updateRoomTypeById = (data, id) => prisma.roomType.update({
  where:{
    id: id
  },
  data : data
});



module.exports = roomTypeService;