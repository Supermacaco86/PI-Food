import React from "react";
import {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
import {addRecipes, getTypes} from "../actions/index";
import {useDispatch, useSelector } from "react-redux";
import "../Estilos/Home.css"



function validate(input){
    let errors = {};
    if (!input.name || isNaN(input.name) === false) errors.name = 'Por favor complete el nombre de la receta';
    if (!input.summary) errors.summary = 'Por favor agregue algun comentrio ';
    if (input.score < 1 || input.score > 100) errors.score = 'El puntaje debe ser un valor entre 1 y 100';
    if (input.healthScore < 1 || input.healthScore > 100) errors.healthScore = 'El valor saludable debe ser un numero entre 1 y 100';
    if (!input.steps.length) errors.steps = 'Por favor, detalle los pasos a seguir de su receta';
    return errors;
}

export default function AddRecipes(){
    const dispatch = useDispatch();
    const history = useNavigate();
    const type = useSelector(state => state.types);
    const [errors, setErrors] = useState({})

    const [input, setInput] = useState({
        name:'',
        summary:'',
        score:'',
        healthScore:'',
        steps:[],
        dietTypes: []
    });
   
function handleChange(e){
    setInput({
        ...input,
        [e.target.name]:e.target.value//en la medida que se valla modificando el input, se va cargando la info
    })
    setErrors(validate({
        ...input,
        [e.target.name]:e.target.value
    }))
};

function handleSelect(e){
    if(!input.dietTypes.includes(e.target.value)){
        setInput({
        ...input,
        dietTypes:[...input.dietTypes, e.target.value]
    })}
};

function handleSubmit(e){
    e.preventDefault()
    setErrors(validate(
        input
    ))
    const recotraError = validate(input)
    if(Object.values(recotraError).length !== 0 || !input.dietTypes.length){
        alert("Todos los campos deben estar llenos")
    }else{
    dispatch(addRecipes(input))
    alert("Receta creada correctamente!")
    setInput({
        name:'',
        summary:'',
        score: '',
        healthScore: '',
        steps: [],
        dietTypes: []
    })
    history('/home')
}
}

function handleDelete(e){
    setInput({
        ...input,
        dietTypes: input.dietTypes.filter(t => t !== e)
    })
}

useEffect(()=>{
    dispatch(getTypes());
}, [dispatch]);

return(
    <div>
        <h1 className="titulo">Creá tu receta</h1>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div>
                <input
                className="boton"
                type="text"
                placeholder="Nombre"
                value={input.name}
                name= "name"
                onChange={(e)=>handleChange(e)}
                />
                {errors.name && (
                    <p className="error">{errors.name}</p>
                )}
            </div><br/>
            <div>
                <input
                className="boton"
                type="text"
                placeholder="Resumen"
                value={input.summary}
                name= "summary"
                onChange={(e)=>handleChange(e)}
                />
                {errors.summary && (
                    <p className="error">{errors.summary}</p>
                )}
            </div><br/>
            <div>
                <input
                max={100}
                min={0}
                className="boton"
                type="number"
                placeholder="Puntaje"
                value={input.score}
                name= "score"
                onChange={(e)=>handleChange(e)}
                />
                {errors.score && (
                    <p className="error">{errors.score}</p>
                )}
            </div><br/>
            <div>
                <input
                 max={100}
                 min={0}
                className="boton"
                type="number"
                placeholder="Valor saludable"
                value={input.healthScore}
                name= "healthScore"
                onChange={(e)=>handleChange(e)}
                />
                 {errors.healthScore && (
                    <p className="error">{errors.healthScore}</p>
                )}
            </div><br/>
            <div>
                <input
                className="boton"
                type="text"
                placeholder="Pasos"
                value={input.steps}
                name= "steps"
                onChange={(e)=>handleChange(e)}
                />
                {errors.steps && (
                    <p className="error">{errors.steps}</p>
                )}
            </div><br/>
            <select className="boton" onChange={(e)=>handleSelect(e)}>
                {type.map((t)=>(
                    <option value={t.name}>{t.name}</option>
                ))}
            </select>
            {errors.dietTypes && (
                    <p className="error">{errors.dietTypes}</p>
                )}
                <ul>{input.dietTypes.map(e=>e+", ")}</ul> 
        {input.dietTypes.map(e=>
        <div>
            <p>{e}</p>
            <button key={e} className="botonX" onClick={()=> handleDelete(e)}>X</button>
        </div>
       
        )} 
        <div>
        <button type="submit">Crear receta</button>
        </div><br/>
        <Link to='/home'><button>Volver</button></Link>
        </form>
    </div>
)


}

//<ul><li>{input.dietTypes.map(e=>e+", ")}</li></ul>