/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, filterRecipesByType, orderByName, orderByScore } from "../actions/actions";
import Card from "./Card";
import Paginate from "./Paginate";
import "./css/CardsContainer.css";
import LoadingAnimation from './LooadingSpiner';



export default function CardsContainer() {

  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const allRecipes = useSelector((state) => state.filterRecipes);
  const [currentPage, setCurrentPage] = useState(1);
  const recipesPerPage = 9;
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipe = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  
  const [orden, setOrden] = useState("");
  const [filter, setFilter] = useState([]);

  const resetFilters = () => {
    setFilter([]);
  };

  // Exponer la función resetFilters en el objeto window para que sea accesible desde otros componentes
  if (typeof window !== 'undefined') {
    window.cardsContainerResetFilters = resetFilters;
  }

  useEffect(() => {
    setIsLoading(true); // Comienza la animación de carga
    
    fetch("http://localhost:3001/diets")
      .then((response) => response.json())
      .then((data) => {
        data.sort();
        data.unshift("Select your DietType");
        setFilter(data);
        setIsLoading(false); // Finaliza la animación de carga
      });
  }, []);
  
  useEffect(() => {
    // Solo carga los datos iniciales si filterRecipes está vacío
    if (allRecipes.length === 0) {
      
      dispatch(getRecipes());
    }
  }, [dispatch, allRecipes]);
  
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
  

  function handleClick(e) {
    e.preventDefault();
    
    dispatch(getRecipes());
  }

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleFilterByType = (e) => {
    if (e.target.value !== "Not defined") {
      dispatch(filterRecipesByType(e.target.value));
      setCurrentPage(1);
    } 
  };
  
  const handleOrderByName = (e) => {
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordered ${e.target.value}`);
  };

  const handleOrderByScore = (e) => {
    dispatch(orderByScore(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordered ${e.target.value}`);
  };

  

  return (
    <div className="container">
      <div className="filterBar">
        
        <select defaultValue="Order" onChange={handleOrderByName}>
          <option  key="A" disabled>Alphabetical order</option>
          <option key="asc" value="asc">
            Ascending A-Z
          </option>
          <option key="desc" value="desc">
            Descending Z-A
          </option>
        </select>
  
        <select defaultValue="Score" onChange={handleOrderByScore}>
          <option key="H" disabled>Health Score</option>
          
          <option key="menos" value="less">
            Less Healthy
          </option>
          <option key="mas" value="more">
            More Healthy
          </option>
        </select>
  
        <select onChange={handleFilterByType}>
          {filter
            .filter(option => option !== "Not defined")
            .map((d, index) => (
              <option key={index} value={d}>
                {d}
              </option>
            ))}
        </select>
  
        <div className="filterReset">
          <button onClick={handleClick} >Refresh recipes</button>
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
            paginado={paginado}
          />
        </>
      )}
    </div>
  );
          }