import React from "react";
import {Link} from "react-router-dom"
import "../Estilos/Card.css"


export default function Card({image, name, dietTypes,id}) {
    return(
        <div className="recipe">
            <Link to={`/home/${id}`}>
            <h3 className="recipeName">{name}</h3>
            </Link>
            <img src={image} alt="img not found"width="250px"height="200px"/>
           <h5  className="dietcointainer">{dietTypes.map(e=>{
                return<div>{e}</div>
            })}</h5>
        </div>    
    )
}
/*
{dietTypes}
<h5>{dietTypes.map(e=>{
    return<div>{e}</div>
})}</h5>

*/