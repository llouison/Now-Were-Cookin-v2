import express from 'express';
import userController from '../controllers/userController.js';
import tokenController from '../controllers/tokenController.js';

const router = express.Router();

router.get('/me', tokenController.protect, (req, res) => {
  res.status(200).json(req.user);
});

router.post(
  '/signup',
  userController.createUser,
  tokenController.generateToken,
  (_req, res) => {
    res.status(200).send({ token: res.locals.token, newuser: res.locals.user });
  }
);

router.post(
  '/login',
  userController.verifyUser,
  tokenController.generateToken,
  (_req, res) => {
    if (res.locals.loggedIn) {
      res.status(200).json({ token: res.locals.token, user: res.locals.user });
    } else res.redirect('/signup');
  }
);

export default router;
