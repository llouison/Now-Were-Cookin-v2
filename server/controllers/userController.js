import User from '../models/userModel.js';

const userController = {};

userController.createUser = async (req, res, next) => {
  const { username, password } = req.body;
  const userExists = await User.findOne({ username: username });
  try {
    if (userExists) {
      throw new Error('user already exists');
    }
    const user = await User.create({
      username: username,
      password: password,
    });
    const userData = await user;
    res.locals.user = userData;
    next();
  } catch (err) {
    return next({
      log: `Error caught in userController.createUser: ${err}`,
      message: {
        err: 'Could not create new user! See log for details',
      },
    });
  }
};

userController.verifyUser = async (req, res, next) => {
  const { username, password } = req.body;
  const userExists = await User.findOne({ username: username });
  try {
    if (!userExists || !(await userExists.comparePasswords(password))) {
      res.locals.loggedIn = false;
      throw new Error('Invalid credentials');
    } else {
      console.log(`🔍 successful user Obj from mongo: ${userExists}`);
      res.locals.loggedIn = true;
      res.locals.user = userExists;
    }
    next();
  } catch (err) {
    return next({
      log: `Error caught in userController.verifyUser: ${err}`,
      message: {
        err: 'Could not verify new user! See log for details',
      },
    });
  }
};

export default userController;
