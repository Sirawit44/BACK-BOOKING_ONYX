const fs = require('fs/promises');
const uploadService = require("../services/upload-service");
const { upload } = require("../services/upload-service")
const createError = require('../utils/createError');
const typeRoomService = require('../services/typeRoom-service');


const roomTypeController = {}

roomTypeController.createRoomType = async(req,res,next)=>{
  try {
    const input = req.body;
    const rs = await typeRoomService.roomType(input);
    console.log(rs)
  } catch (error) {
    next(error)
  }

};

roomTypeController.getTypeRoom = async(req,res,next)=>{
 const rs = await typeRoomService.getAllRoomType()
 res.status(200).json(rs)
}

roomTypeController.getRoomTypeById = async(req,res,next)=>{
  console.log(req.params.id)
  const roomTypeId = req.params.id
  const rs = await typeRoomService.getRoomTypeById(+roomTypeId)
  res.status(200).json(rs)
}

roomTypeController.updateImageType = async(req,res,next)=>{
  try{
    const promises = [];
    console.log(req.files)
    if(req.files.imageType){
      const result = uploadService.upload(req.files.imageType[0].path).then(url =>({url, key: 'imageType'}))
      promises.push(result)
    }
    

    const result = await Promise.all(promises)
    console.log(result)
    const data = result.reduce((acc,item)=>{
      acc[item.key]= item.url
      return acc
    },{})


    await typeRoomService.updateRoomTypeById(data, +req.body.id);

    res.status(200).json(data)
  }catch(err){
    next(err)
  } finally{
    console.log(req.files.imageType[0].path)
    if(req.files.imageType){
      fs.unlink(req.files.imageType[0].path)
    }
    
  }
};





module.exports = roomTypeController;