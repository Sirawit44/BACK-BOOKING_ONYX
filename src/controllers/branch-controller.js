const fs = require('fs/promises');
const uploadService = require("../services/upload-service");
const { upload } = require("../services/upload-service")
const createError = require('../utils/createError');
const branchService = require('../services/branch-service');

const branchController = {};

branchController.createBranch = async(req,res,next)=>{
  try{
    const input = req.body
    const rs = await branchService.createBranch(input);
    res.status(200).json({rs});
  }catch(err){
    next(err)
  } 
};

branchController.getAllBranch = async(req,res,next)=>{
  try {
    const result = await branchService.getAllBranch()
    res.status(200).json({branch:result})
  } catch (err) {
    next(err)
  }
}

branchController.updateImageHeaderOrImageMap = async(req,res,next)=>{
  try{
    const promises = [];
    console.log(req.files)
    if(req.files.imageHeader){
      const result = uploadService.upload(req.files.imageHeader[0].path).then(url =>({url, key: 'imageHeader'}))
      promises.push(result)
    }
    if(req.files.imageMap){
      const result = uploadService.upload(req.files.imageMap[0].path).then(url =>({url, key: 'imageMap'}))
      promises.push(result)
    }

    const result = await Promise.all(promises)
    console.log(result)
    const data = result.reduce((acc,item)=>{
      acc[item.key]= item.url
      return acc
    },{})


    await branchService.updateBranchById(data, +req.body.branchId);

    res.status(200).json(data)
  }catch(err){
    next(err)
  } finally{
    console.log(req.files.imageHeader[0].path)
    if(req.files.imageHeader){
      fs.unlink(req.files.imageHeader[0].path)
    }
    if(req.files.imageMap){
      fs.unlink(req.files.imageMap[0].path)
    }
  }
};





module.exports = branchController;