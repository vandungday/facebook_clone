const express = require('express');
const router = express.Router();
const { authUser } = require('../middlewares/auth');
const { createPost } = require('../controllers/post.controller');

router.post('/createPost', authUser, createPost);

module.exports = router;
