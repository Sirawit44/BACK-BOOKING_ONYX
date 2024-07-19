const express = require('express');
const branchController = require('../controllers/branch-controller');
const upload = require('../middlewares/upload');
const { validateImageHeaderOrMapHeader } = require('../middlewares/validator');

const branchRouter = express.Router();

// create
branchRouter.post('/', branchController.createBranch)

// get
branchRouter.get('/', /*validatecreateBranch */ branchController.getAllBranch)

// update
branchRouter.patch('/update', 
  upload.fields([
    {name: 'imageHeader', maxCount:1},
    {name: 'imageMap', maxCount: 1},
    {name: 'branchId', maxCount:1}
  ]),
  validateImageHeaderOrMapHeader,
  branchController.updateImageHeaderOrImageMap
);



module.exports = branchRouter;