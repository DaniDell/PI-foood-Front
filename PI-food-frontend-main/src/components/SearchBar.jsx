import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { searchByName, setPage } from "../redux/actions/actions";
import Logo from '../img/logo2.png'
import "./css/Searchbar.css";

export default function Searchbar() {
  const dispatch = useDispatch();
  const [name, setName] = useState(""); // Inicializar con un valor vacío
  const [alertMessage, setAlertMessage] = useState("");
   
  const filterRecipes = useSelector(state => state.filterRecipes);

  useEffect(() => {
    if (filterRecipes.length === 0 ) {
      setAlertMessage("No results found. Please refine your search.");
    } else {
      clearForm();
      setAlertMessage("");
    }
  }, [filterRecipes]);

  function clearForm() {
    setName(""); // Limpia el input
  }

  function handleInputChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!name) {
      setAlertMessage("Type something to perform your search");
      return;
    }

    dispatch(searchByName(name.toLowerCase().trim())); 
    dispatch(setPage(1));

    if (typeof window.cardsContainerResetFilters === 'function') {
      window.cardsContainerResetFilters();
    }

    if (filterRecipes.length === 0 ) {
      setAlertMessage("No results found. Please refine your search.");
    } else {
      setAlertMessage("");
      clearForm();
    }
  }

  function handleAlertClose() {
    setAlertMessage("");
    clearForm();
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
            value={name} // Establecer el valor del input
            onChange={handleInputChange}
          />
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
