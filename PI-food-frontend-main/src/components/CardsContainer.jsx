/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getRecipes, filterRecipesByType, orderByName, orderByScore } from "../actions/actions";
import Card from "./Card";
import Paginate from "./Paginate";
import "./css/CardsContainer.css";

export default function CardsContainer() {
  const dispatch = useDispatch();
  const allRecipes = useSelector((state) => state.recetasTotal);

  const [currentPage, setCurrentPage] = useState(1);
  const [orden, setOrden] = useState("");
  const recipesPerPage = 9;
  const indexOfLastRecipe = currentPage * recipesPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
  const currentRecipe = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  const [filter, setFilter] = useState([]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    // Desplazar la ventana hacia arriba después de cambiar de página
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    fetch("http://localhost:3001/diets")
      .then((response) => response.json())
      .then((data) => {
        data.sort(); 
        data.unshift("All");
        setFilter(data);
      });
  }, []);

  useEffect(() => {
    dispatch(getRecipes());
  }, [dispatch]);

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
      <div className="filtros">
        <select defaultValue="Order" onChange={handleOrderByName}>
          <option disabled>Order</option>
          <option key="asc" value="asc">
            Ascending
          </option>
          <option key="desc" value="desc">
            Descending
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

        <select defaultValue="Score" onChange={handleOrderByScore}>
          <option disabled>Score</option>
          <option key="mas" value="mas">
            More Healthy
          </option>
          <option key="menos" value="less">
            Less Healthy
          </option>
        </select>
        
        <button onClick={handleClick}>All</button>
      </div>
    

      {currentRecipe?.map((e) =>
  //e.diets.includes("Not defined") ? null : (
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
  //)
)}
<Paginate
        recipesPerPage={recipesPerPage}
        allRecipes={allRecipes.length}
        paginado={paginado}
        onPageChange={handlePageChange} // Pasa la función de manejo de cambio de página
      />
    </div>
  );
}
