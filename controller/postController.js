var postModel = require('../models/postModel');
var { paginatedResult } = require('../helpers/paginate');
/**
 * Create a  Post.
 */
exports.createPost = async (req, res) => {
  try {
    const { title, body } = req.body;
    if (!title || !body) {
      return res.status(422).json({ error: 'Plase add all the fields' });
    }
    const post = new postModel({
      title,
      body,
      //   photo: pic,
      postedBy: req.user.userName,
    });

    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) {
    console.log('david errorPost', error.message);
  }
};

/**
 * Get All Post.
 */

exports.getAllPosts = async (req, res) => {
  try {
    const data = await postModel.find({});
    if (!data) {
      res.status(404).json({ message: 'Error getting all user data' });
    }
    return res.status(200).json(data);
  } catch (error) {
    res.status(404).json({ message: 'internal server error' });
  }
};

/**
 * Get All Post with pagination.
 */

exports.getAllPostsWithPagination = async (req, res, next) => {
  paginatedResult(postModel);
  postModel
    .find()
    .then((data) => {
      res.send(res.paginatedResult);
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || 'Error occured while retriving Post information',
      });
    });
};

/**
 * Get All Post by ID.
 */

exports.getPostById = async (req, res) => {
  const post = await postModel.findById(req.params.id);
  if (post) {
    res.status(200).json({ data: post });
  } else {
    res.status(404);
    throw new Error(`Product not Found`);
  }
};

/**
 * Update Post .
 */
exports.updatePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);

    const post_id = req.params.id;

    const newData = {
      title: req.body.title || post.title,
      body: req.body.body || post.body,
    };
    const data = await postModel
      .findByIdAndUpdate(post_id, newData, {
        new: true,
      })
      .exec();
    return res
      .status(200)
      .json({ message: 'Updated successfully', data: data });
  } catch (error) {
    return res
      .status(404)
      .json({ message: 'Error updating data, please check post_id' });
  }
};

/**
 * Delete post .
 */

exports.deletePost = async (req, res) => {
  try {
    await postModel.remove();
    res.status(200).json('Post has been deleted Successfully');
  } catch (err) {
    return res.status(500).json(err);
  }
};
