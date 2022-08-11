const axios = require("axios");
const { Recipe, Type } = require("../db");
const { v4: uuidv4 } = require("uuid");
require("dotenv").config();
const { API_KEY } = process.env;



const getTypes = async (req, res, next) =>{
const apiUrl = await axios.get(`https://api.spoonacular.com/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true&number=100`);
const apiInfo = await apiUrl.data.results.map(e => e.diets).flat(Infinity)
apiInfo.forEach(e=>{
    Type.findOrCreate({
        where: {name: e}
    })
})
const allTypes= await Type.findAll()
res.send(allTypes)


} 

 module.exports = {
    getTypes
}