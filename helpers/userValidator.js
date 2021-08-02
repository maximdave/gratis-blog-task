var Joi = require('joi');

exports.validateSignUp = (userSignUp) => {
  const Schema = Joi.object({
    userName: Joi.string().min(2).required(),
    gender: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    profile_picture: Joi.string(),
    cloudinary_id: Joi.string(),
  });
  return Schema.validate(userSignUp);
};

exports.validateLogin = (userLogin) => {
  const schema = Joi.object({
    password: Joi.string().min(3).max(30).required(),
    email: Joi.string().email().required(),
  });
  return schema.validate(userLogin);
};

// module.exports = {
//   validateSignUp: validateSignUp,
//   validateLogin: validateLogin,
// };
