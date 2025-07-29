import User from '../models/userModel.js';

const userController = {};

/**
 * createUser - create and save a new User into the database.
 */
userController.createUser = (req, res, next) => {
  // write code here
  const { username, password } = req.body;
  User.create({
    username: username,
    password: password,
  })
    .then((data) => {
      //   console.log(`💁🏽 userController.createUser: data: ${data}`);
      res.locals.user = data;
      return next();
    })
    .catch((err) => {
      return next({
        log: `Error caught in userController.createUser: ${err}`,
        message: {
          err: 'Could not create new user! See log for details',
        },
      });
    });
};

/**
 * verifyUser - Obtain username and password from the request body, locate
 * the appropriate user in the database, and then authenticate the submitted password
 * against the password stored in the database.
 */
userController.verifyUser = (req, res, next) => {
  const { username, password } = req.body;
  User.findOne({
    username: username,
  })
    .exec()
    .then(async (user) => {
      if (!data || !(await user.comparePasswords(password))) {
        res.locals.loggedIn = false;
      } else {
        console.log(`🔍 successful user Obj from mongo: ${data}`);
        res.locals.loggedIn = true;
        res.locals.user = user;
      }
      next();
    })
    .catch((err) => {
      console.log(`An error has occurred: ${err}`);
    });
};

export default userController;
