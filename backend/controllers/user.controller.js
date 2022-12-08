const {
  validateEmail,
  validateLength,
  validateUsername,
} = require('../helpers/validation');
const User = require('../models/User');
const Code = require('../models/Code');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { generateToken } = require('../helpers/token');
const { sendVerificationEmail, sendResetCode } = require('../helpers/email');
const ErrorResponse = require('../common/ErrorResponse');
const asyncHandler = require('../utils/asyncHandler');

exports.register = asyncHandler(async (req, res, next) => {
  try {
    const {
      first_name,
      last_name,
      email,
      password,
      username,
      bYear,
      bMonth,
      bDay,
      gender,
    } = req.body;

    if (!validateEmail(email)) {
      return res.status(400).json({
        message: 'Lỗi email',
      });
    }
    const check = await User.findOne({ email });

    if (check) {
      return res.status(400).json({
        message: 'Email này đã tồn tại, thử với email khác',
      });
    }

    if (!validateLength(first_name, 3, 30)) {
      return res.status(400).json({
        message: 'first name must between 3 and 30 characters.',
      });
    }
    if (!validateLength(last_name, 3, 30)) {
      return res.status(400).json({
        message: 'last name must between 3 and 30 characters.',
      });
    }
    if (!validateLength(password, 6, 40)) {
      return res.status(400).json({
        message: 'password must be atleast 6 characters.',
      });
    }

    const cryptedPassword = await bcrypt.hash(password, 12);

    let tempUsername = first_name + ' ' + last_name;
    let newUsername = await validateUsername(tempUsername);
    const user = await new User({
      first_name,
      last_name,
      email,
      password: cryptedPassword,
      username: newUsername,
      bYear,
      bMonth,
      bDay,
      gender,
    }).save();
    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      '30m'
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);
    const token = generateToken({ id: user._id.toString() }, '7d');
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: 'Register Success ! please activate your email to start',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.activateAccount = asyncHandler(async (req, res, next) => {
  try {
    const { token } = req.body;
    const validUser = req.user.id;
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    if (validUser !== user.id) {
      return res.status(400).json({
        message: 'Bạn không có quyền kích hoạt tài khoản này',
      });
    }

    const check = await User.findById(user.id);
    if (check.verified == true) {
      return res.status(400).json({ message: 'Email này đã được kích hoạt' });
    } else {
      await User.findByIdAndUpdate(user.id, { verified: true });
      return res
        .status(200)
        .json({ message: 'Tài khoản đã kích hoạt thành công' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.login = asyncHandler(async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message:
          'the email address you entered is not connected to an account.',
      });
    }
    const check = await user.correctPassword(password, user.password);
    if (!check) {
      return res.status(400).json({
        message: 'Invalid credentials.Please try again.',
      });
    }
    const token = generateToken({ id: user._id.toString() }, '7d');
    res.send({
      id: user._id,
      username: user.username,
      picture: user.picture,
      first_name: user.first_name,
      last_name: user.last_name,
      token: token,
      verified: user.verified,
      message: 'Register Success ! please activate your email to start',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.sendVerification = asyncHandler(async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    if (user.verified == true) {
      return next(new ErrorResponse('Tài khoản này đã được kích hoạt', 400));
    }

    const emailVerificationToken = generateToken(
      { id: user._id.toString() },
      '30m'
    );
    const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
    sendVerificationEmail(user.email, user.first_name, url);

    return res.status(200).json({
      message: 'Đường dẫn xác thực đã được gửi tới email của bạn',
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

exports.findEmail = asyncHandler(async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({ email }).select('-password');
  if (!user) {
    return res.status(404).json({
      message: ' Không có kết quả tìm kiếm.',
    });
  }

  return res.status(200).json({
    email: user.email,
    picture: user.picture,
  });
});

exports.sendCode = asyncHandler(async (req, res, next) => {
  const email = req.body.email;
  const user = await User.findOne({ email }).select('-password');
  await Code.findOneAndRemove({ id: user._id });

  let code = '';
  for (let i = 0; i < 5; i++) {
    code += Math.floor(Math.random() * 10);
  }

  await new Code({
    code,
    user: user._id,
  }).save();

  sendResetCode(user.email, user.first_name, code);

  return res.status(200).json({
    message: 'Email reset code has been sent to your email',
    code,
  });
});

exports.verifiCode = asyncHandler(async (req, res, next) => {
  const { email, code } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    return next(new ErrorResponse('User không tồn tại', 400));
  }
  const codeModel = await Code.findOne({ id: user._id });

  if (codeModel.code !== code) {
    return next(new ErrorResponse('Mã code sai', 400));
  }

  return res.status(200).json({
    message: 'success',
  });
});

exports.resetPassword = asyncHandler(async (req, res, next) => {
  const { email, resetPassword } = req.body;
  const user = await User.findOne({ email });

  user.password = resetPassword;
  user.save();

  return res.status(200).json({
    message: 'success',
  });
});
