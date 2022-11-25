const express = require('express');
const router = express.Router();
const {
  register,
  activateAccount,
  login,
  sendVerification,
  findEmail,
  sendCode,
  verifiCode,
  resetPassword,
} = require('../controllers/user.controller');
const { authUser } = require('../middlewares/auth');

router.post('/register', register);
router.post('/activate', authUser, activateAccount);
router.post('/login', login);
router.post('/sendVerification', authUser, sendVerification);
router.post('/identify', findEmail);
router.post('/sendCode', sendCode);
router.post('/verifyCode', verifiCode);
router.post('/resetPassword', resetPassword);

module.exports = router;
