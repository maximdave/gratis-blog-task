var express = require('express');
var router = express.Router();
var { userAuthorization } = require('../controller/authorisation');

var { createComment, getPostComment, editPostComment, deletePostComment } = require('../controller/commentController');

router.post('/gratis/post/:postId/comment', userAuthorization, createComment);
router.get('/gratis/post/:postId/comment', userAuthorization, getPostComment);
router.put('/gratis/comment/:commentId', userAuthorization, editPostComment);
router.delete('/gratis/comment/:commentId', userAuthorization, deletePostComment);

module.exports = router;
