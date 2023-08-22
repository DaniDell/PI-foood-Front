import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { searchByName, setPage } from "../redux/actions/actions";
import Logo from '../img/logo2.png'
import "./css/Searchbar.css";



export default function Searchbar() {

  const initialName = "";

  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
   
  const filterRecipes = useSelector(state => state.filterRecipes);

  function clearForm() {
    setName(initialName); // Limpia el input
  }


  useEffect(() => {
    if (filterRecipes.length === 0 ) {
      setAlertMessage("No results found. Please refine your search.");
    } else {
      
      clearForm(); // Limpia el formulario
      setAlertMessage(""); // Limpiar la alerta si hay resultados
    }
  }, [filterRecipes]);

  function handleInputChange(e) {
    setName(e.target.value);
     // Reinicia la página al filtrar
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    if (!name) {
      setAlertMessage("Type something to perform your search");
      return;
    }
  
    dispatch(searchByName(name.toLowerCase().trim())); 
    dispatch(setPage(1));
  
    // Aquí reutilizamos la función de reseteo de filtros del componente CardsContainer
    if (typeof window.cardsContainerResetFilters === 'function') {
      window.cardsContainerResetFilters();
    }
    
    // Mostrar mensaje de alerta si no hay resultados
    if (filterRecipes.length === 0 ) {
      setAlertMessage("No results found. Please refine your search.");
    } else {
      setAlertMessage(""); // Limpiar la alerta si hay resultados
      
    }
  }

  
  
  
  function handleAlertClose() {
    setAlertMessage("");
    clearForm(); // Limpiar el input
  }

  return (
    <div className="buscador">



      <NavLink className="logo" to={'/'}>
        <img src={Logo} alt="Logo Henry Food Home" width="140px"></img>
      </NavLink>
     
      <NavLink className="recipeCreate" to={"/foodcreate"}>
        CREATE NEW RECIPE!
      </NavLink>

      <div className="buscadorLupa">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="recipes"
          placeholder={name ? "" : "Search recipes by name"}
          onChange={handleInputChange}
        ></input>
        <button type="submit" className="buscar">
        
        🔍
      
        </button>
      </form>
      </div>

      {alertMessage && (
        <div className="alert">
          <span className="alert-message">{alertMessage}</span>
          <button className="alert-close" onClick={handleAlertClose}>
            X
          </button>
        </div>
      )}
    </div>
  );
}
