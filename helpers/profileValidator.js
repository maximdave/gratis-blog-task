var Joi = require('joi');

const validateProfileUpdate = (userSignUp) => {
  const Schema = Joi.object({
    firstName: Joi.string().min(2),
    lastName: Joi.string().min(2),
    userName: Joi.string().min(2),
    gender: Joi.string(),
    profile_picture: Joi.string(),
    cloudinary_id: Joi.string(),
  });
  return Schema.validate(userSignUp);
};

module.exports = validateProfileUpdate;
