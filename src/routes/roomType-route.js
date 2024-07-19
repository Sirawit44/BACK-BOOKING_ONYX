const express = require('express');
const upload = require('../middlewares/upload');
// const { validateImageHeaderOrMapHeader } = require('../middlewares/validator');
const roomTypeController = require('../controllers/roomType-controller');


const roomTypeRouter = express.Router();

// create
roomTypeRouter.post('/', roomTypeController.createRoomType )

// get
roomTypeRouter.get('/', roomTypeController.getTypeRoom)

roomTypeRouter.get('/:id', roomTypeController.getRoomTypeById)

// update
roomTypeRouter.patch('/update', 
  upload.fields([
    {name: 'imageType', maxCount:1},
    {name: 'id', maxCount:1}
  ]),
  // validateImageType,
  roomTypeController.updateImageType
);



module.exports = roomTypeRouter;