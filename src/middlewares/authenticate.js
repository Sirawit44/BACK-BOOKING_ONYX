const authService = require("../services/auth-service");
const jwtService = require("../services/jwt-service");
const createError = require("../utils/createError");

const authenticate = async (req,res,next)=>{
  try{
    const authorization = req.headers.authorization;
    console.log('authorization',authorization)
    if(!authorization || !authorization.startsWith('Bearer ')){
      createError({
        message: 'UnAuthenticated1',
        statusCose: 401
      });
    } 
    const accessToken = authorization.split(' ')[1];
    const payload = jwtService.verify(accessToken);

    const user = await authService.findUserById(payload.id)
    if(!user){
      createError({
        message: 'user not found',
        statuscode : 400
      });
    }
    req.user = user;

    delete user.password;

    
    next();
  }catch(err){
    next(err)
  }
};


module.exports = authenticate;