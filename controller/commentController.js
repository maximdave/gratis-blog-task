var postModel = require('../models/postModel');

exports.createComment = async (req, res) => {
  try {
    const comment = req.body.comment;
    const post = await postModel.findById(req.params.id);

    const commentPost = {
      userName: req.user.userName,
      comment,
      userId: req.user._id,
    };
    console.log('this is the name', commentPost.name);
    post.comments.push(commentPost);

    await post.save();
    res.status(201).json({ message: 'comment added Successfully' });
  } catch (error) {
    console.log('david errorCreateComment', error.message);
  }
};
