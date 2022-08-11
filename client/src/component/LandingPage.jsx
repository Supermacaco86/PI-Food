import React from "react";
import {Link} from "react-router-dom";
import "../Estilos/LandingPage.css" 

export default function LandingPage (){
    return(
        
        <div className="posicion" >

            <h1 className="posicion">Bienvenido a Cocinar saludable!</h1>
            <Link to = "/home">
                <button className="button">Ingresar</button>
            </Link>
        </div>
        
    )
}