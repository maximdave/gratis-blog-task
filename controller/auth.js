var { validateLogin } = require('../helpers/userValidator');
var { validateSignUp } = require('../helpers/userValidator');
var jwt = require('jsonwebtoken');
var UserModel = require('../models/userModel');
var bcrypt = require('bcrypt');
var cloudinary = require('../helpers/cloudinary');

var dotenv = require('dotenv');
dotenv.config();

async function signUp(req, res) {
  const { error } = validateSignUp(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  try {
    //generate new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    const email = req.body.email;

    //cloudinary image upload
    let result = '';
    if (req.file) {
      result = await cloudinary.uploader.upload(req.file.path);
    }
    const newUser = new UserModel({
      userName: req.body.userName,
      gender: req.body.gender,
      email: email,
      password: hashedPassword,
      profile_picture: result.secure_url,
      cloudinary_id: result.public_id,
    });

    const inputEmail = await UserModel.findOne({ email });
    if (inputEmail) return res.status(400).send('User already exists');

    //save user and respond
    const user = await newUser.save();
    res.status(201).json({
      message: 'User Created Successfully',
      user: user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
}

async function signIn(req, res) {
  try {
    const { error } = validateLogin(req.body);
    if (error) {
      return res.status(400).send(error.message);
    }

    const user = await UserModel.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Invalid emaill or password');

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword)
      return res.status(400).send('Invalid emaill or password');

    const token = jwt.sign(
      {
        user,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: '3h' }
    );

    res.status(200).json({
      token,
      status: 'success',
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        gender: user.gender,
        _id: user._id,
      },
    });
  } catch (error) {
    res.status(500).send({ message: 'Error sigining you in' });
  }
}

module.exports = {
  signUp: signUp,
  signIn: signIn,
};
