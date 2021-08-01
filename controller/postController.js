var postModel = require('../models/postModel');

const createPost = async (req, res) => {
  try {
    const post = new postModel({
      title: req.body.title,
      description: req.body.description,
    });

    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) {
    console.log('david errorPost', error.message);
  }
};

module.exports = {
  createPost: createPost,
  //     getAllUsers: getAllUsers,
  //     updateUserProfile: updateUserProfile,
  //     deleteUserProfile: deleteUserProfile,
};
