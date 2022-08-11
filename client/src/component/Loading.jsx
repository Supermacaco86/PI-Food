import React from "react";
import "../Estilos/Loading.css"

export default function Loading({setLoading}){
    return(
    <div>
        <h1 className="loading">Cargando</h1>
        <div>
             {
                 setTimeout(() =>{
                     setLoading(false)
                 }, 5000)
             }
         </div>
    </div>
    )
}
