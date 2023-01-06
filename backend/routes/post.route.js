const express = require('express');
const router = express.Router();
const { authUser } = require('../middlewares/auth');
const { createPost, getAllPosts } = require('../controllers/post.controller');

router.get('/posts', authUser, getAllPosts);
router.post('/createPost', authUser, createPost);

module.exports = router;
