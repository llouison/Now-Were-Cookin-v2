import express from 'express';
import recipeController from '../controllers/recipeController.js';

const router = express.Router();

router.get('/', protect, recipeController.getAllRecipes, (_req, res) => {
  res.status(200).send({ recipes: res.locals.recipes });
});

router.get('/:id', recipeController.getOneRecipe, (_req, res) => {
  res.status(200).send({ recipe: res.locals.recipe });
});

router.post('/', recipeController.createRecipe, (_req, res) => {
  res.status(200).send({ newRecipe: res.locals.recipe });
});

router.put('/:id', protect, recipeController.updateOneRecipe, (_req, res) => {
  res.status(200).send({ updatedRecipe: res.locals.recipe });
});

router.delete(
  '/:id',
  protect,
  recipeController.deleteOneRecipe,
  (_req, res) => {
    res.status(200).send({ deletedRecipe: res.locals.recipe });
  }
);

export default router;
