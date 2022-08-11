const axios = require("axios");
const { Recipe, Type } = require("../db");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const { API_KEY } = process.env;

const getApiInfo = async () => {
  const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
  const apiInfo = await apiUrl.data.results.map((e) => {
    return {
      id: e.id,
      image: e.image,
      name: e.title,
      dietTypes: e.diets,
      summary: e.summary,
      score: e.spoonacularScore,
      healthScore: e.healthScore,
      dishTypes: e.dishTypes,
      steps: e.analyzedInstructions[0]? e.analyzedInstructions[0].steps.map((e) => {
        return {
          number: e.number,
          step: e.step,
        };
      }):"Pasos no encontrados",
    };
  });
  //res.status(200).send(apiInfo)
  return apiInfo
};

const getDbInfo = async () => {
  const recipesDb = await Recipe.findAll({include: Type});
  const response = recipesDb.map(e=>{
    return{
      id: e.id,
      name: e.name,
      summary: e.summary,
      score: e.spoonacularScore,
      healthScore: e.healthScore,
      dietTypes: e.Types?.map(e=>e.name),
      steps: e.steps
  }
})
return response
};

const getAllRecipes = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const allInfo = await apiInfo.concat(dbInfo);
  return allInfo;
};

const getRecipes = async (req, res) => {
  const { name } = req.query;
  let allRecipes = await getAllRecipes();
  if (name) {
    const recipeName = await allRecipes.filter((e) =>
      e.name.toLowerCase().startsWith(name.toLowerCase())
    );
    recipeName.length
      ? res.status(200).send(recipeName)
      : res.status(404).send("Receta no encontrada");
  } else {
    res.status(200).send(allRecipes);
  }
};

const createRecipe = async (req, res) => {
  let { name, summary, score, healthScore, steps, dietTypes } = req.body;
  let idv4 = uuidv4();
  const dbId = idv4.slice(0, 4);
  let recipesCreated = await Recipe.create({
    id: dbId,
    name: name,
    summary: summary,
    score: score,
    healthScore: healthScore,
    steps: steps,
  });
  let typeDb = await Type.findAll({
    where: {
      name: dietTypes,
    }
  });
  recipesCreated.addType(typeDb);
  res.status(200).send(recipesCreated);
};

const getRecipesById = async (req, res) => {
  const id = req.params.id;
  const recipesTotal = await getAllRecipes();
   let recipesId = await recipesTotal.filter((e) => e.id == id);
  recipesId.length?
       res.status(200).send(recipesId):
       res.status(404).send("Receta no encontrada");
};

module.exports = {
  createRecipe,
  getRecipes,
  getRecipesById, 
};
