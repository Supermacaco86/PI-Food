
//import { GET_RECIPES } from "../actions/index";



const initialState = {
    recipes: [],
    allRecipes: [],
    types: [],
    details: [],
}

function rootReducer (state = initialState, action){
    switch(action.type){
        case 'GET_RECIPES':
            return{
                ...state,
                recipes: action.payload,
                allRecipes: action.payload               
            };
        case 'GET_RECIPE_BY_NAME':
             return{
                ...state,
                recipes: action.payload
            }
        case 'FILTER_BY_DIET_TYPE':
            const allRecipes = state.allRecipes;
            const statusFiltered = allRecipes.filter(r => r.dietTypes?.some(d => d.toLowerCase() === action.payload.toLowerCase()))                                         
            return{
                ...state,
                recipes: statusFiltered
            };
        case 'ADD_RECIPE':
            return{
                ...state,
            };
        case 'GET_TYPES':
            return{
                ...state,
                types: action.payload
            };
        case 'GET_DETAILS':
            return{
                ...state,
                details: action.payload
            };
        case 'SET_DETAIL':
            return{
                ...state,
                details: action.payload
            };

        case 'ALPHABETICAL_SORT':
            let sortByAlfa = [...state.recipes]
            sortByAlfa = action.payload === "atoz"?
            state.recipes.sort(function(a, b){
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return 1};
                 if(a.name.toLowerCase() < b.name.toLowerCase()){
                    return -1};
                    return 0;
                }):
            state.recipes.sort(function(a, b){
                if(a.name.toLowerCase() < b.name.toLowerCase()){
                    return 1};
                if(a.name.toLowerCase() > b.name.toLowerCase()){
                    return -1};
                    return 0;
                });
            return{
                ...state,
                recipes: sortByAlfa
            };
        case 'SCORE_SORT':
            let sortByScore = [...state.recipes]
            sortByScore = action.payload === 'max'?
            state.recipes.sort(function(a, b){
                if(a.healthScore > b.healthScore){
                    return 1};
                if(a.healthScore < b.healthScore){
                    return -1};
                    return 0;
                }):       
            state.recipes.sort(function(a, b){
                if(a.healthScore < b.healthScore){
                    return 1};
                if(a.healthScore > b.healthScore){
                    return -1}; 
                    return 0;
                });
            return{
                ...state,
                recipes: sortByScore            
            }
            default:
                return state;
    }

}

export default rootReducer