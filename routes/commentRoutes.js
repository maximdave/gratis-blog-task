var express = require('express');
var router = express.Router();
var { userAuthorization } = require('../controller/authorisation');

var { createComment } = require('../controller/commentController');

router.post('/gratis/post/:id/comment', userAuthorization, createComment);

module.exports = router;
