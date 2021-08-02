const mongoose = require('mongoose');

const comment_schema = new mongoose.Schema({
  userName: {
    type: String,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
    ref: 'Users',
  },
  content: {
    type: String,
    required: 'Content is Required',
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post',
    required: 'Post is Required Field',
  },
});

const CommentModel = mongoose.model('Comment', comment_schema);

module.exports = CommentModel;
