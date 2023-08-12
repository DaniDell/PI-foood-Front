import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { searchByName } from "../actions/actions";
import Logo from '../img/logo2.png'
import "./css/Searchbar.css";

export default function Searchbar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  function handleInputChange(e) {
    setName(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!name) {
      setAlertMessage("Type something to perform your search");
      return;}
    dispatch(searchByName(name.toLowerCase().trim())); 
  

     // Aquí reutilizamos la función de reseteo de filtros del componente CardsContainer
     if (typeof window.cardsContainerResetFilters === 'function') {
      window.cardsContainerResetFilters();
    }
  }

  return (
    <div className="buscador">



      <NavLink className="logo" to={'/'}>
        <img src={Logo} alt="Logo Henry Food Home" width="180px"></img>
      </NavLink>
     
      <NavLink className="recipeCreate" to={"/foodcreate"}>
        CREATE NEW RECIPE!
      </NavLink>

      <div className="buscadorLupa">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="recipes"
          placeholder="Search recipes by name"
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
          <button className="alert-close" onClick={() => setAlertMessage("")}>
            X
          </button>
        </div>
      )}
    </div>
  );
}
