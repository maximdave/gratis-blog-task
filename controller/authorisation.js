var jwt = require('jsonwebtoken');
var UserModel = require('../models/userModel');

var dotenv = require('dotenv');

dotenv.config();

async function userAuthorization(req, res, next) {
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

module.exports = {
  userAuthorization: userAuthorization,
};

// var jwt = require('jsonwebtoken');
// var UserModel = require('../models/userModel');
// var dotenv = require('dotenv');
// dotenv.config();

// async function userAuthorization(req, res, next) {
//   const { authorization } = req.headers;
//   //authorization === Bearer ewefwegwrherhe
//   if (!authorization) {
//     return res.status(401).json({ error: 'you must be logged in' });
//   }
//   const token = authorization.replace('Bearer ', '');
//   jwt.verify(token, process.env.JWT_SECRET_KEY, (err, payload) => {
//     if (err) {
//       return res.status(401).json({ error: 'you must be logged in' });
//     }

//     const { _id } = payload;
//     UserModel.findById(_id).then((userdata) => {
//       req.user = userdata;
//       next();
//     });
//   });
// }

// module.exports = {
//   userAuthorization: userAuthorization,
// };
