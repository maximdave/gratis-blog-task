var postModel = require('../models/postModel');
var CommentModel = require('../models/commentModel');

exports.createComment = async (req, res) => {
  try {
    //Find a POst
    const post = await postModel.findOne({ _id: req.params.postId });

    //Create a Comment
    const comment = new CommentModel();
    comment.content = req.body.content;
    comment.userName = req.user.userName;
    comment.userId = req.user._id;
    comment.post = post._id;
    await comment.save();

    // Associate Post with comment
    post.comments.push(comment._id);
    await post.save();

    res.send(comment);
  } catch (error) {
    console.log('david errorCreateComment', error.message);
  }
};

exports.getPostComment = async (req, res) => {
  try {
    const post = await postModel
      .findOne({ _id: req.params.postId })
      .populate('comments');
    res.send(post);
  } catch (error) {
    console.log('getcomment error', error.message);
  }
};

//Edit a Comment

exports.editPostComment = async (req, res) => {
  try {
    const comment = await CommentModel.findOneAndUpdate(
      {
        _id: req.params.commentId,
      },
      req.body,
      { new: true, runValidators: true }
    );

    res.send(comment);
  } catch (error) {
    console.log('getcomment error', error.message);
  }
};

// Delete comment
exports.deletePostComment = async (req, res) => {
  try {
    await CommentModel.findByIdAndRemove(req.params.commentId);
    res.send({ message: 'Comment Successfully Deleted' });
  } catch (error) {
    console.log('getcomment error', error.message);
  }
};
