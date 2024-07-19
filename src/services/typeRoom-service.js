const prisma = require("../models/prisma");

const typeRoomService = {}
typeRoomService.roomType = (data) => prisma.roomType.create({data});

typeRoomService.findRoomTypeByName = (typeName) => prisma.roomType.findFirst({
  where : {typeName : typeName}
});


typeRoomService.getAllRoomType = ()=> prisma.roomType.findMany();

typeRoomService.getRoomTypeById = (id) => prisma.roomType.findUnique({
  where:{ id : id }
});

typeRoomService.updateRoomTypeById = (data, id) => prisma.roomType.update({
  where:{
    id: id
  },
  data : data
});



module.exports = typeRoomService;