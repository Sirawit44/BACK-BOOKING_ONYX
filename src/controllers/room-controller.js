const fs = require('fs/promises');
const createError = require('../utils/createError');
const roomService = require('../services/room-service');
const roomController = {};

roomController.createRoom = async(req,res,next)=>{
  try{
    const input = req.body
    const rs = await roomService.createRoom(input);
    res.status(200).json({rs});
  }catch(err){
    next(err)
  } 
};

roomController.getAvailableRoom = async(req,res,next)=>{
  try {
    console.log('branchId',req.body.branchId)
    const result = await roomService.findAvailableRoom(req.body.roomTypeId,req.body.branchId)
    res.status(200).json({room:result[0]})
  } catch (err) {
    next(err)
  }
}






module.exports = roomController;