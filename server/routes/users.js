import express from 'express';
import userController from '../controllers/userController.js';

const router = express.Router();

router.get('/signup', (_req, res) => {
  res.status(500).send('To-Do:create a signup form');
});

router.post('/signup', userController.createUser, (_req, res) => {
  res.status(200).send({ newuser: res.locals.user });
});

router.post('/login', userController.verifyUser, (_req, res) => {
  if (res.locals.loggedIn) {
    res.redirect('/recipes');
  } else res.redirect('/signup');
});

export default router;
