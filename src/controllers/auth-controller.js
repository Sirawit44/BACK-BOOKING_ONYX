const { json } = require("express");
const authService = require("../services/auth-service");
const hashService = require("../services/hash-service");
const jwtService = require("../services/jwt-service");
const createError = require("../utils/createError");

const authController = {}

authController.register = async(req,res,next)=>{
  try{
    const data = req.body;
    delete data.confirmPassword
    const existsUser = await authService.findUserByEmail(data.email)
    if(existsUser) return createError({message : 'email already in use', statusCode : 400})

    data.password = await hashService.hash(data.password)
    await authService.createUser(data)
    console.log(data.password)
    return res.status(201).json(data)
  }catch(err){
    next(err)
  }
};


authController.login = async(req,res,next)=>{
  console.log('first')
  try{
    const existsUser = await authService.findUserByEmail(req.body.email);
    // console.log('exists====>',existsUser)
    if(!existsUser) createError({message: 'Invalid credential', statusCode : 400 });

    const isMatch = await hashService.compare(req.body.password, existsUser.password);
    console.log('rs===>',req.body.password)
    console.log('rs1===>',existsUser.password)
    console.log('isMatch===>', isMatch)

    if(!isMatch) createError({message: 'Invalid credential', statusCode : 400 });

    const accessToken = jwtService.sign({id: existsUser.id})
    res.status(200).json({accessToken});

  }catch(err){
    next(err)
  }

}

authController.getMe = async (req, res, next) => {
  try {
    const authorization = req.headers.authorization;
    const accessToken = authorization.split(" ")[1];
    console.log("accessToken", accessToken);
    res.status(200).json({ user: req.user, accessToken: accessToken });
  } catch (error) {
    next(error);
  }
};
 
module.exports = authController;