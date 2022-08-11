import React from "react";

export default function Paginado ({recipesPerPage, recipes, paginado}){
    const pageNumber = []
    for(let i = 1; i<Math.ceil(recipes/recipesPerPage); i++){
        pageNumber.push(i)
        
    }
    return(    //este componente va a ser el que renderice los numeritos en si
        <nav>
            <ul >
                {pageNumber &&
                 pageNumber.map(number =>(
                    
                  <button key = {number} onClick = {() => paginado(number)}>{number}</button>
                 
                 ))}
            </ul>
        </nav>
       
    )
}


  //<li className="number" key={number}>

//<a onClick={() => paginado(number)}>{number}</a>
 //</li>