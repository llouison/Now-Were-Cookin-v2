import Recipe from '../models/recipeModel';

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

recipeController.getAllRecipes = (req, res, next) => {
  const { category } = req.query;
  const query = category ? { category } : {};
  console.log('in get recipes');
  Recipe.find(query, (err, recipes) => {
    if (err)
      return next(
        'Error in recipeController.getAllRecipes: ' + JSON.stringify(err)
      );
    res.locals.recipes = recipes;
    return next();
  });
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

recipeController.createRecipe = (req, res, next) => {
  const {
    title,
    author,
    category,
    cookTime,
    photo,
    ingredients,
    instructions,
  } = req.body;
  const recipeInfo = req.body;
  Recipe.create(recipeInfo)
    .exec()
    .then((recipeDoc) => {
      console.log('recipeDoc:', recipeDoc);
      res.locals.recipe = recipeDoc;
      return next();
    })
    .catch((err) => {
      return next(
        createErr({
          log: `Error caught in recipeController.createRecipe: ${err}`,
          message: {
            err: 'Could not create recipe! See log for details',
          },
        })
      );
    });
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

    const deletedRecipe = await recipe.deleteOne();
    res.locals.recipe = deletedRecipe;
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

module.exports = recipeController;
