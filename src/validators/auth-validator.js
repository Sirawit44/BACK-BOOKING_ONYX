const Joi = require('joi');

exports.registerSchema = Joi.object({
  firstName : Joi.string().required().trim(),
  lastName: Joi.string().required().trim(),
  email : Joi.string().email({tlds: false}).required().strip(),
  password : Joi.string().required().pattern(/^[0-9a-zA-z]{6,12}$/),
  confirmPassword : Joi.string().required().valid(Joi.ref('password')).strip(),
  mobile : Joi.string().pattern(/^[0-9]{10}$/),
  role: Joi.string()
});

exports.loginSchema = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().required()
});