import axios from "axios";


export function getRecipes(){
    return async function(dispatch){
        var json = await axios.get("/recipe")
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
}

export function getRecipeByName(payload){
    return async function(dispatch){
       try{
            var json = await axios.get(`/recipe?name=${payload}`)
            return dispatch({
                type: 'GET_RECIPE_BY_NAME',
                payload: json.data
            })
        }catch(error){
          if(error.response)
          alert(error.response.data)  
        }
    }
}

export function getTypes(){
    return async function(dispatch){
        var json = await axios.get("/type",{})
        return dispatch({
            type: 'GET_TYPES',
            payload: json.data
          
        })
    }
}


export function addRecipes(payload){
    return async function(dispatch){
        var json = await axios.post("/recipe", payload)
        return json
    }
}

export function filterByDietType(payload){
    return{
        type: 'FILTER_BY_DIET_TYPE',
        payload
    }
};

export function aplhabeticalSort(payload) {
    return {
        type: 'ALPHABETICAL_SORT',
        payload
    }
};

export function setDetail(){
    return{
        type: 'SET_DETAIL',
        payload: []
    }
}

export function scoreSort(payload) {
    return {
        type:'SCORE_SORT',
        payload
    }
};

export function getDetails(id){
    return async function (dispatch){
        try{
            var json = await axios.get(`/recipe/${id}`)
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
    })
}catch (error){
    if(error.response){
        alert(error.response.data)
        window.location.href = 'http://localhost:3000/Home'
    }
}
}
};







/* export function getRecipes() {
    return function(dispatch) {
        axios.get("http://localhost:3001/recipe")   
    .then((response) => {
        return dispatch({
            type: 'GET_RECIPES',
             payload: response.data
            })
         }
    )
}};*/

/*
export function getRecipes(){
    return(dispatch)=>{
        return fetch("http://localhost:3001/recipe")
        .then(response => response.json())
        .then(response => dispatch({
            type: 'GET_RECIPES',
            payload: response
        }))
        .catch(error => console.log(error))
    }
}*/
