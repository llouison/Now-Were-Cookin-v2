import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';

const tokenController = {};

tokenController.protect = async (req, _res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // if token is valid, data is stored in decoded variable
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // exclude password from find
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch {
      return next({
        log: `Error caught in tokenController.protect: ${err}`,
        message: {
          err: 'Not authorized, token failed',
        },
      });
    }
  }
};

tokenController.generateToken = (_req, res, next) => {
  const id = res.locals.user._id;
  try {
    res.locals.token = jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
    next();
  } catch (err) {
    return next({
      log: `Error caught in tokenController.generateToken: ${err}`,
      message: {
        err: 'Unable to generate token',
      },
    });
  }
};

export default tokenController;
