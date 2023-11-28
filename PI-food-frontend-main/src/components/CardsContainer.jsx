import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, filterRecipesByType, orderByName, orderByScore, resetFilters, setPage } from "../redux/actions/actions";
import Card from "./Card";
import Paginate from "./Paginate";
import "./css/CardsContainer.css";
import LoadingAnimation from './LooadingSpiner';
import FiltersMenu from "./FiltersMenu";


export default function CardsContainer() {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [mounted, setMounted] = useState(false);
  const allRecipes = useSelector((state) => state.filterRecipes);
  const currentPage = useSelector((state) => state.currentPage); 
  
  

  const recipesPerPage = 8;
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipe = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);
  
  // eslint-disable-next-line
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
        setFilter(data);
        setIsLoading(false); // Finaliza la animación de carga
        
      });
  }, [dispatch]);

  useEffect(() => {
    if (!mounted) {
      // Evita que se pierdan los fitros cuando se va a otra ruta
      if (allRecipes.length === 0) {
        dispatch(getRecipes());
      }
      setMounted(true);
    }
  }, [dispatch, allRecipes, mounted]);


  
  const handleFilterByType = (e) => {
    if (e.target.value !== "Not defined") {
      dispatch(filterRecipesByType(e.target.value));
      dispatch(setPage(1)); // Reinicia la página al filtrar
    } 
  };
  
  const handleOrderByName = (e) => {
       dispatch(orderByName(e.target.value));
    dispatch(setPage(1)); // Reinicia la página al ordenar
  };

  const handleOrderByScore = (e) => {    
    dispatch(orderByScore(e.target.value));
    dispatch(setPage(1)); // Reinicia la página al ordenar
  };

  return (
    <div className="container">
      <div className="filterBar">
      <FiltersMenu
        handleFilterByType={handleFilterByType}
        handleOrderByName={handleOrderByName}
        handleOrderByScore={handleOrderByScore}
        handleResetFilters={handleResetFilters}
        filterOptions={filter}
      />
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