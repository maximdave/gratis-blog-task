var mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const commentSchema = mongoose.Schema(
  {
    userName: {
      type: String,
    },
    comment: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: false,
      ref: 'Users',
    },
  },
  { timestamps: true }
);

const postSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    comments: [commentSchema],
    postedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;
