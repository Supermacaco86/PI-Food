import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {getRecipeByName} from "../actions/index";


export default function SearchBar({setCurrentPage}){
    const dispatch = useDispatch()
    const [input, setInput] = useState("")//estado local, que es lo que está escribirndo el usuario en el input


function handleInputChange(e){
    e.preventDefault();
    setInput(e.target.value)//tomo para el estado local el valor del input
}

function handleSubmit(e){
    e.preventDefault();
    dispatch(getRecipeByName(input))
    setInput('')
    setCurrentPage(1)
}

    return(
        <div>
            <input
            value= {input}
            type = 'text'
            placeholder="Buscar..."
            onChange={(e)=>handleInputChange(e)}
            />
            <button type="submit" onClick={(e)=>handleSubmit(e)}>Buscar</button>    
        </div>
    )
}