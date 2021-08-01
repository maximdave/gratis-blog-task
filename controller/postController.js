var postModel = require('../models/postModel');

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

// exports.createComment = async (req, res) => {
//   try {
//     const comment = req.body.comment;
//     const post = await postModel.findById(req.params.id);

//     const commentPost = {
//       userName: req.user.userName,
//       comment,
//       userId: req.user._id,
//     };
// console.log('this is the name',commentPost.name)
//     post.comments.push(commentPost);

//     await post.save();
//     res.status(201).json({ message: 'comment added Successfully' });
//   } catch (error) {
//     console.log('david errorCreateComment', error.message);
//   }
// };
