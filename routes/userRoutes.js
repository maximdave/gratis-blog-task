var express = require('express');
var router = express.Router();
var upload = require('../helpers/multer');
var { signUp, signIn } = require('../controller/auth');
var { userAuthorization } = require('../controller/authorisation');
var {
  updateUserProfile,
  singleUserProfile,
  getAllUsers,
  deleteUserProfile,
} = require('../controller/userprofile');

/* GET users listing. */
router.post('/gratis/signUp', upload.single('image'), signUp);
router.post('/gratis/sigIn', signIn);
router.put('/gratis/updateProfile/:id', upload.single('image'), updateUserProfile);
router.get('/gratis/userProfile/:id', singleUserProfile);
router.delete('/gratis/userProfile/:id', deleteUserProfile);
router.get('/gratis/userProfile/', getAllUsers);

module.exports = router;
