const express = require('express');
const reservationController = require('../controllers/reservation-controller');
const authenticate = require('../middlewares/authenticate');


const reservationRouter = express.Router();

//create
reservationRouter.post('/',reservationController.createReservation )

// get
reservationRouter.get('/',reservationController.userGetReservation)

//delete
reservationRouter.patch('/cancel/:id',reservationController.cancelReservation)







module.exports = reservationRouter;