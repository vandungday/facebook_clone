const Post = require('../models/Post');
const asyncHandler = require('../utils/asyncHandler');

exports.createPost = asyncHandler(async (req, res, next) => {
  const post = await Post.create(req.body);
  return res.status(200).json(post);
});
