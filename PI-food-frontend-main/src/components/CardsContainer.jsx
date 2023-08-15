import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, filterRecipesByType, orderByName, orderByScore, getDiets, resetFilters, setPage } from "../actions/actions";
import Card from "./Card";
import Paginate from "./Paginate";
import "./css/CardsContainer.css";
import LoadingAnimation from './LooadingSpiner';

export default function CardsContainer() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const allRecipes = useSelector((state) => state.filterRecipes);
  const currentPage = useSelector((state) => state.currentPage); 

  const recipesPerPage = 9;
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipe = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const [orden, setOrden] = useState("");
  const [filter, setFilter] = useState([]);

  const handleResetFilters = () => {
    dispatch(resetFilters()); // Llama a la acción para restablecer los filtros
  };

  useEffect(() => {
    setIsLoading(true); // Comienza la animación de carga
    
    fetch("http://localhost:3001/diets")
      .then((response) => response.json())
      .then((data) => {
        data.sort();
        data.unshift("Select your DietType");
        setFilter(data);
        dispatch(getDiets(data)); 
        setIsLoading(false); // Finaliza la animación de carga
      });
  }, []);

  useEffect(() => {
    if (!mounted) {
      // Solo carga los datos iniciales si allRecipes está vacío en el montaje inicial
      if (allRecipes.length === 0) {
        dispatch(getRecipes());
      }
      setMounted(true);
    }
  }, [dispatch, allRecipes, mounted]);

  // Ahora agrega otro useEffect para cargar los diet types cada vez que el componente se renderice
  useEffect(() => {
    fetch("http://localhost:3001/diets")
      .then((response) => response.json())
      .then((data) => {
        data.sort();
        data.unshift("Select your DietType");
        setFilter(data);
      });
  }, []);
  
  const handleFilterByType = (e) => {
    if (e.target.value !== "Not defined") {
      dispatch(filterRecipesByType(e.target.value));
      dispatch(setPage(1)); // Reinicia la página al filtrar
    } 
  };
  
  const handleOrderByName = (e) => {
    console.log("handleOrderByName called");
  console.log("Value:", e.target.value);

    dispatch(orderByName(e.target.value));
    dispatch(setPage(1)); // Reinicia la página al ordenar
    setOrden(`Ordered ${e.target.value}`);
  };

  const handleOrderByScore = (e) => {
    console.log("handleOrderByScore called");
    console.log("Value:", e.target.value);
    dispatch(orderByScore(e.target.value));
    dispatch(setPage(1)); // Reinicia la página al ordenar
    setOrden(`Ordered ${e.target.value}`);
  };

  return (
    <div className="container">
      <div className="filterBar">
        <div className="filterDiet"> 
      <select onChange={handleFilterByType}>
          {filter
            .filter(option => option !== "Not defined")
            .map((d, index) => (
              <option key={index} value={d}>
                {d}
              </option>
            ))}
        </select></div>

        
        <div className="filterSelect1">
  <label>
   Health Score order
  </label>
  <select
    value={orden} // Cambia esta línea
    onChange={handleOrderByScore}
  >
    <option value="" >Select an option</option>
    <option value="less">Less Healthy</option>
    <option value="more">More Healthy</option>
  </select>
</div>

<div className="filterSelect2">
  <label>
    Alphabetical order
  </label>
  <select
    value={orden} // Cambia esta línea
    onChange={handleOrderByName}
  >
    <option value="">Select an option</option>
    <option value="asc">Ascending A-Z</option>
    <option value="desc">Descending Z-A</option>
  </select>
</div>

  
        <div className="filterReset">
          <button onClick={handleResetFilters} >Refresh recipes</button>
        </div>
      </div>
  
      {isLoading ? (
        
        <LoadingAnimation />
      ) : (
        
        <>
          {currentRecipe?.map((e) => (
            <Card
              key={e.id}
              id={e.id}
              name={e.name}
              summary={e.summary}
              healthScore={e.healthScore}
              image={e.image}
              diets={e.diets}
              instructions={e.instructions}
            />
          ))}
          <Paginate
            recipesPerPage={recipesPerPage}
            allRecipes={allRecipes.length}
          />
        </>
      )}
    </div>
  );
          }