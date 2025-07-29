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
      console.log(`💁🏽 userController.createUser: data: ${data}`);
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
  //TO-DO: refactor to use .findOne
  User.find({
    username: username,
  }) /*.find returns an array, userschema sets unique usernames */
    .exec() //makes it a real promise
    .then(async (data) => {
      if (data.length === 0) {
        res.locals.loggedIn = false;
      } else {
        // console.log(`successful user Obj from mongo: ${data}`);
        const user = data[0];
        res.locals.loggedIn = true;
        res.locals.userId = user._id.toString();
        // Method to compare password
        const passwordComparison = await user.comparePasswords(password);
      }
      next();
    })
    .catch((err) => {
      console.log(`An error has occurred: ${err}`);
    });
};

export default userController;
