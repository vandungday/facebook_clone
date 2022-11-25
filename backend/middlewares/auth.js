const jwt = require('jsonwebtoken');

exports.authUser = async (req, res, next) => {
  try {
    let tmp = req.header('Authorization');

    const token = tmp ? tmp.slice(7, tmp.length) : '';
    if (!token) {
      return res.status(400).json({ message: 'Invalid Authentification' });
    }
    jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(400).json({ message: 'Invalid Authentification' });
      }
      req.user = user;
      next();
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// const util = require('util');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const ErrorResponse = require('../common/ErrorResponse');

// exports.protect = async (req, res, next) => {
//   // check and get token from req headers
//   let token;
//   if (req.headers.authorization?.startsWith('Bearer')) {
//     token = req.headers.authorization.split(' ')[1];
//   }
//   if (!token) {
//     return next(new ErrorResponse('Token không hợp lệ', 401));
//   }

//   // verify token
//   const secretKey = process.env.TOKEN_SECRET;
//   const decoded = await util.promisify(jwt.verify)(token, secretKey);

//   // check user exist
//   const user = await User.findById(decoded.id);
//   if (!user) {
//     return next(new ErrorResponse('Token không hợp lệ', 401));
//   }

//   // assign user into request obj
//   req.user = user;
//   next();
// };
