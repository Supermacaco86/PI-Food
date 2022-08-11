import React from "react";
import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getDetails, setDetail} from "../actions/index";
import {useEffect, useState} from "react";
import Loading from "./Loading";
import "../Estilos/Details.css"


export default function Details(){
   
    const dispatch = useDispatch();
    const {id} = useParams();
    const [loading, setLoading] = useState(true);
    //const id = props.match.params.id;
    const details = useSelector((state)=>state.details)
    
    useEffect(() => {
        dispatch(getDetails(id))
        {dispatch(setDetail())}
    }, [dispatch, id])


    return(
       
        <div className="detalle">
             { loading === true? (<Loading setLoading={setLoading}/>):
            <div>
                <img src= {details.length? details[0].image:"Imagen no encontrada"}/>
                <h2 className="sumary">{ details[0].name}</h2>
                <h3 className="sumary">{ details[0].dishTypes}</h3>
                <h3 className="sumary">{ details[0].dietTypes}</h3>
                <h5 className="sumary">{ details[0].summary.replace(/<[^>]*>/g, '')}</h5>
                <h5 className="sumary">{details[0].steps[0].step?details[0].steps.map(e=>e.step):details[0].steps}</h5> 
                <Link to="/home"><button >Volver a recetas</button></Link>  
            </div>
            }   
        </div>
    )}
{/*


.map(e=>{
                 return(
                    <li>{e.step}</li>
                    )Array.isArray(details.steps)
<h5 className="texts">{details.length ? details.steps.map(e => {
                    return(
                        <li>{e}</li>
                        )}):
                        "Pasos no encontrados"
                    }        
              </h5>


            
            
           


<h5 className="texts">{details.length? details[0].steps:"Pasos a seguir no encontrados"}</h5>

{details[0].dishTypes?
                <div>
                    <h2>Tipo de comida:</h2>
                    {details[0].dishTypes?.map(e=>{
                        return(
                            <h2>{e}</h2>
                        )
                    })}
                </div>:
                <br/>
             }
             </div>
             <div>
                    <h2>Tipo de dieta:</h2>
                    {details.dietTypes?details.dietTypes.map(e=>{
                        return(
                            <h2>{e}</h2>
                        )
                    }):
                    details.diet?.map(e=>{
                        return(
                            <h2>{e.name}</h2>
                        )
                    })
                    }
             </div>
             <div>
                <h3>Resumen:</h3>
                <p>{details.summary?.replace(/<[^>]*>/g, '')}</p>
             </div>
             <div>
                <h3>Puntaje:{details.score}</h3>
                <h3>Valor saludable:{details.healthScore}</h3>
             </div>
             <div>
             <h3>Pasos:</h3>
             
             </div>} */}