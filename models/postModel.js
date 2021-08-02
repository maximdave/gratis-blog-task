var mongoose = require('mongoose');

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
    comments: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment",
        required: "Comment is Required"
      }
    ],
    postedBy: {
      type: String,
    },
  },
  { timestamps: true }
);

const PostModel = mongoose.model('Post', postSchema);

module.exports = PostModel;
