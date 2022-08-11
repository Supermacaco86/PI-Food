//const dietTypesDb = require ("../controllers/funciones");
const { Router } = require('express');
const recipes = require ('../controllers/recipes');
const types = require ('../controllers/types');
const {Recipe, Type} = require ("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get("/type", types.getTypes);
router.post("/recipe", recipes.createRecipe);
router.get("/recipe", recipes.getRecipes);
router.get('/recipe/:id', recipes.getRecipesById);

module.exports = router;
