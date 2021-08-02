var express = require('express');
var router = express.Router();
var { userAuthorization } = require('../controller/authorisation');

var {
  createPost,
  getAllPosts,
  getPostById,
  getAllPostsWithPagination,
  updatePost,
  deletePost
} = require('../controller/postController');
const { paginatedResult } = require('../helpers/paginate');
const PostModel = require('../models/postModel');

router.post('/gratis/post', userAuthorization, createPost);
router.get('/gratis/post', userAuthorization, getAllPosts);
router.get('/gratis/post/:id', userAuthorization, getPostById);
router.put('/gratis/post/:id', userAuthorization, updatePost);
router.delete('/gratis/post/:postId', userAuthorization, deletePost);
router.get(
  '/gratis/posts',
  userAuthorization,
  paginatedResult(PostModel),
  getAllPostsWithPagination
);

module.exports = router;
