const Post = require('../models/Post');
const asyncHandler = require('../utils/asyncHandler');

exports.createPost = asyncHandler(async (req, res, next) => {
  const post = await Post.create(req.body);
  return res.status(200).json(post);
});

exports.getAllPosts = asyncHandler(async (req, res, next) => {
  try {
    const posts = await Post.find()
      .populate('user', '_id first_name last_name username picture')
      .sort({ createdAt: -1 });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});
