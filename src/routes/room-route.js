const express = require('express');
const upload = require('../middlewares/upload');
const roomController = require('../controllers/room-controller');


const roomRouter = express.Router();

// create
roomRouter.post('/', roomController.createRoom)

roomRouter.get('/statusAvailable', roomController.statusAvailable)
// get
roomRouter.get('/',roomController.getAvailableRoom)





module.exports = roomRouter;