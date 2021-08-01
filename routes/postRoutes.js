var express = require('express');
var router = express.Router();
var { userAuthorization } = require('../controller/authorisation');

var { createPost } = require('../controller/postController');

router.post('/gratis/post', userAuthorization, createPost);
// router.get('/products', getAllProducts);
// router.get('/product/:id', getProduct);
// router.get('/products/top', getTopProduct);
// router.put('/product/:id', verifyToken, admin, updateProduct);
// router.delete('/product/:id', verifyToken, admin, deleteProduct);
// router.post('/product/:id/reviews', verifyToken, createProductReview);

module.exports = router;
