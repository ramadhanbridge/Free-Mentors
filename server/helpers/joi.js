const Joi = require('@hapi/joi');

const loginValidation = (data) => {
  const schema = {
    email: Joi.string().min(4).required().email(),
    password: Joi.string().min(4).required(),
  };
  return Joi.validate(data, schema);
};

const signupValidation = (data) => {
  const schema = {
    firstName: Joi.string().min(4).required(),
    lastname: Joi.string().min(4).required(),
    address: Joi.string().min(4).required(),
    Bio: Joi.string().min(4).required(),
    occupation: Joi.string().min(4).required(),
    expertise: Joi.string().min(4).required(),
    email: Joi.string().min(4).required().email(),
    password: Joi.string().min(4).required(),
  };
  return Joi.validate(data, schema);
};

module.exports.loginValidation = loginValidation;
module.exports.signupValidation = signupValidation;
