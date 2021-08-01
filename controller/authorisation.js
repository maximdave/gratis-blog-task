var jwt = require('jsonwebtoken');
var UserModel = require('../models/userModel');

var dotenv = require('dotenv');

dotenv.config();

async function userAuthorization(req, res) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    try {
      const decodedToken = await jwt.verify(token, process.env.JWT_SECRET_KEY);
      const user = await UserModel.findById({ _id: decodedToken.user._id });
      if (!user) {
        return res.status(400).json('no token provided');
      } else {
        req.user = user;
      }
    } catch (err) {
      return res.status(400).json({ error: err });
    }
  } else {
    return res.status(400).json('not Authorized');
  }
  next();
}

module.exports = userAuthorization;
