import Recipe from '../models/recipeModel.js';

const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return {
    log: `recipeController.${method} ${type}: ERROR: ${
      typeof err === 'object' ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in recipeController.${method}. Check server logs for more details.`,
    },
  };
};

const recipeController = {};

recipeController.getAllRecipes = async (req, res, next) => {
  const { category } = req.query;
  const query = category ? { category } : {};
  try {
    const recipes = await Recipe.find(query);
    res.locals.recipes = recipes;
    next();
  } catch (err) {
    return next(
      createErr({
        log: `Error caught in recipeController.getAllRecipes: ${err}`,
        message: {
          err: 'Could not get recipes! See log for details',
        },
      })
    );
  }
};

recipeController.getOneRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return next(
        'Error in recipeController.getOneRecipe: ' + JSON.stringify(err)
      );
    }
    res.locals.recipe = recipe;
    next();
  } catch (err) {
    return next(
      createErr({
        log: `Error caught in recipeController.createRecipe: ${err}`,
        message: {
          err: 'Could not create recipe! See log for details',
        },
      })
    );
  }
};

recipeController.createRecipe = async (req, res, next) => {
  const { title, category, cookTime, photoUrl, ingredients, instructions } =
    req.body;
  try {
    const recipe = await Recipe.create({
      title,
      author: req.user._id,
      category,
      cookTime,
      photoUrl,
      ingredients,
      instructions,
    });
    res.locals.recipe = recipe;
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

recipeController.updateOneRecipe = async (req, res, next) => {
  const { title, category, cookTime, photo, ingredients, instructions } =
    req.body;
  const recipeInfo = req.body;
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    if (recipe.createdBy.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    recipe.title = title || recipe.title;
    recipe.category = category || recipe.category;
    recipe.cookTime = cookTime || recipe.cookTime;
    recipe.photo = photo || recipe.photo;
    recipe.ingredients = ingredients || recipe.ingredients;
    recipe.instructions = instructions || recipe.instructions;

    const updatedRecipe = await recipe.save();
    res.locals.recipe = updatedRecipe;
    next();
  } catch (err) {
    return next(
      createErr({
        log: `Error caught in recipeController.updateOneRecipe: ${err}`,
        message: {
          err: 'Could not update recipe! See log for details',
        },
      })
    );
  }
};

recipeController.deleteOneRecipe = async (req, res, next) => {
  try {
    const recipe = await Recipe.findById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ message: 'Recipe not found' });
    }

    if (recipe.author.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'Not authorized' });
    }

    await recipe.deleteOne();
    next();
  } catch (err) {
    return next(
      createErr({
        log: `Error caught in recipeController.deleteOneRecipe: ${err}`,
        message: {
          err: 'Could not delete recipe! See log for details',
        },
      })
    );
  }
};

export default recipeController;
