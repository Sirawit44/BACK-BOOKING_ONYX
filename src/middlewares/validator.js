const createError = require("../utils/createError");
const { registerSchema, loginSchema } = require("../validators/auth-validator");

exports.registerValidator = (req,res,next)=>{
  console.log(req.body)
  const {value, error} = registerSchema.validate(req.body)
  if (error) return res.status(400).json({message : error.details[0].message });
  req.input = value
  next();
};


exports.loginValidator = (req,res,next)=>{
  console.log(req.body)
  const {value, error} = loginSchema.validate(req.body)
  if (error) return res.status(400).json({message : error.details[0].message });
  req.input = value
  next();
};

exports.validateImageHeaderOrMapHeader = (req,res,next)=>{
  if(!req.files) return createError({message: 'at least one of header image or map image', statusCode: 400})
  next()
}

exports.validateSlipImage = (req, res, next) => {
  if (!req.files.imageSlip)
    return createError({
      message: "at least one of profile image",
      statusCode: 400,
    });
  next();
};



// paymentController.createPayment = async(req,res,next)=>{
//   try{

//     const input = req.files
//     console.log(input)
//     console.log('nnnnnn',req.body.reservationId)

//     const promises = [];
//     if (req.files.imageSlip) {
//       const result = uploadService.upload(req.files.imageSlip[0].path).then((url) => ({ url, key: "imageSlip" }));
//       promises.push(result);
//     }

//     const result = await Promise.all(promises);
//     console.log("result", result);
//     const imageSlip = result.reduce((acc, item) => {
//       acc[item.key] = item.url;
//       return acc;
//     }, {});


//     const rs = await paymentService.createPayment({imageSlip, reservationId: +req.body.reservationId});
//     res.status(200).json({rs});
//   }catch(err){
//     next(err)
//   } finally {
//     if (req.files.imageSlip) {
//       fs.unlink(req.files.imageSlip[0].path);
//     }
//   }
// };