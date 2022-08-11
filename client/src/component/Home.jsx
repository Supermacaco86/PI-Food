import React, { Fragment } from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {getRecipes, filterByDietType, aplhabeticalSort, scoreSort} from '../actions/index';
import {Link} from 'react-router-dom';
import Card from './Card';
import Paginado from './Paged'; 
import SearchBar from './SearchBar';
import Loading from './Loading';
import "../Estilos/Home.css"



export default function Home() {

    const dispatch = useDispatch();
    const recipes = useSelector((state)=>state.recipes)//esto es lo mismo que usar el mapStateToProps
    const [order, setOrder] = useState('')
    const [currentPage, setCurrentPage] = useState(1)//aca seteo un estado local de la pagina en la que empiza el home, osea en la pagina 1
    const [recipesPerPage, setRecipesPerPage] = useState(9)//aca seteo la cantidad de recetas que va a tener cada pagina en el estado local
    const indexOfLastRecipe = currentPage * recipesPerPage// esta variable va a tener el valor de el numero de la pagina actual por la cantidad de recetas(ultimo valor de receta en la pagina) 
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage// aca obtenemos el indice de la primer receta
    const currentRecipes = recipes.slice(indexOfFirstRecipe,indexOfLastRecipe)// al total de las recetas por pagina, separa las recetas(slice) y toma la primera y la ultima de la pagina(que se lo pasamos por parametro)entonces devuelve un arreglo con los personajes del 0 al 8(total 9) en cada pagina porque el ultimo parametro no te lo da, te da el antereior
    const [loading, setLoading] = useState(true);

    const paginado = (pageNumber)=>{//esta funcion renderiza el paginado
        setCurrentPage(pageNumber);
    }

    

    useEffect(()=>{//este es lo mismo que hacer el mapDispatchToProps
        dispatch(getRecipes())
        },[dispatch]);// En el segndoparametro le indico que quiero que cada vez que suceda el dispatch se ejecute el useEffect

    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes());
    }

    function handleFilterByDietType(e){
        dispatch(filterByDietType(e.target.value)); 
    }
    function handleScoreSort(e){
        e.preventDefault();
        dispatch(scoreSort(e.target.value));
        setCurrentPage(1)
        setOrder(`Order${e.target.value}`);
    }

    function handleAlfaSort(e){
        e.preventDefault();
        dispatch(aplhabeticalSort(e.target.value));
        setCurrentPage(1)
        setOrder(`Order ${e.target.value}`);
    }

    
    return(
        <div className="home">
            <h1 className="titulo">La cocina a tu alcance</h1>
            <button className="button" onClick={e=>{handleClick(e)}}>
                Volver a cargar las recetas
            </button> <br/><br/>
            <div className="input-wrapper">
            <Link to = '/recipe'>
            <button className="button">Crear receta</button>
            </Link>
                <select className="boton" onChange={e=>handleScoreSort(e)}>
                    <option disabled selected>Score</option>
                    <option value= 'max'>Ascendente</option>
                    <option value= 'min'>Descendente</option>
                </select>
                <select className="boton" onChange={e=>handleAlfaSort(e)}>
                    <option disabled selected>Alfabetico</option>
                    <option value="atoz">A to Z</option>
                    <option value="ztoa">Z to A</option>
                </select>
                <select className="boton" onChange={e=>handleFilterByDietType(e)}>
                <option disabled selected>Select...</option>
                    <option value="gluten free">Gluten Free</option>
                    <option value="ketogenic">Keto</option>
                    <option value="vegetarian">Vegetarian</option>
                    <option value="lacto ovo vegetarian">Lacto-Ovo-Vegetarian</option>
                    <option value="vegan">Vegan</option>
                    <option value="pescetarian">Pescetarian</option>
                    <option value="paleolithic">Paleo</option>
                    <option value="primal">Primal</option>
                    <option value="low fodmap">Low FODMAP</option>
                    <option value="whole 30">Whole30</option>
                    <option value="dairy free">Dairy Free</option>
                </select>
                <Paginado
                recipesPerPage= {recipesPerPage}
                recipes= {recipes.length}
                paginado= {paginado}
                />
                <SearchBar setCurrentPage = {setCurrentPage} />
                <div className="card">
                { recipes===0?<p>(<Loading setLoading={setLoading}/>)</p>:
                currentRecipes.map((e)=>{
                        return(
                            <div>   
                            <Card id= {e.id} name= {e.name} image= {e.image} dietTypes = {e.dietTypes}/>
                            </div>
                        )
                        
                     })}
                  </div>
            </div>
        </div>
    )
   
} 

//<Link to = {"/home/" + e.id }></Link>