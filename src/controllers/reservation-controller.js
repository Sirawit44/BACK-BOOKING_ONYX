const fs = require('fs/promises');
const uploadService = require("../services/upload-service");
const { upload } = require("../services/upload-service");
const reservationService = require('../services/reservation-service');
const paymentService = require('../services/payment-service');
const roomService = require('../services/room-service');
const createError = require('../utils/createError');

const reservationController = {};

reservationController.createReservation = async(req,res,next)=>{
  try{
    const {roomTypeId,branchId,totalPrice, checkInDate,checkOutDate,...input } = req.body.data
console.log(roomTypeId,branchId)
    const roomSelected = await roomService.findAvailableRoom(roomTypeId,+branchId) // add check=> branchId

    console.log('roomSelected',roomSelected)
    if(roomSelected.length === 0) {
      return createError({
        message: 'No ROOM',
        statuscode : 400
      })
    }
    

    const convert  = await roomService.unAvailableRoom(roomSelected[0].id, 'FALSE' )
    console.log('convert',convert)

    const data = {
      userId:req.user.id,
      roomId:convert.id,
      checkInDate:checkInDate,
      checkOutDate:checkOutDate,
      totalPrice:totalPrice
    }
    console.log('data',data)
    
    const rs = await reservationService.createReservation(data);
console.log('rsssss',rs)
    // const image = req.files
    // console.log('nnnnnn',input.ImageSlip[0].path)

    // const payment = await paymentService.createPayment({ImageSlip : image.ImageSlip[0].path});

    res.status(200)
    .json({reservation:rs})
    // .json('hghghg')
  }catch(err){
    next(err)
  } 
};

reservationController.userGetReservation = async(req,res,next)=>{
  try {
    const userId = +req.user.id
    console.log('userId',userId)
    const data= await reservationService.findReservation(userId)
    res.status(201).json(data)
  } catch (error) {
    next(error)
  }
}

reservationController.cancelReservation = async(req,res,next)=>{
  try {
    const id = +req.params.id
    console.log(id)
    const data= await reservationService.findRoomUnique(id)
    console.log(data.id)
    const deleteRoom = await reservationService.cancelRoomById(data.id)
    console.log('deleteRoom',deleteRoom)
    res.status(200).json({message: `delete room ${data.roomId} complete`})
    
  } catch (error) {
    next(error)
  }
}





module.exports = reservationController;