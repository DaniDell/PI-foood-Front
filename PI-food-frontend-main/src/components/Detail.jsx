import React, { useState, useEffect } from "react";
import "./css/Detail.css";
import { useParams, NavLink } from "react-router-dom";
import Logo from '../img/logo.png';
// eslint-disable-next-line
import BackButton from "./BackButton"; 

export default function Detail() {
  const [recipe, setRecipe] = useState({
    id: "",
    name: "",
    healthScore: 0,
    summary: "",
    instructions: "",
    image: "",
    diets: [],
   
  });

  const { recipeId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/recipes/${recipeId}`)
      .then((response) => response.json())
      .then((data) => {
        setRecipe(data);
      })
      .catch((error) => window.alert("Something went wrong, please try again"));
  }, [recipeId]);

  return (
    <div className="det-cont">
      <div className="back-container"> 
        <BackButton /> 
      </div>

      <div className="left-margin"></div>
      <div className="right-margin"></div>
      <h1>
        <NavLink  to={'/home'}>
          <img src={Logo} alt="Logo Henry Food Home" width="180px"></img>
        </NavLink>
      </h1>
    
      <div className="detalle">
        <h1 className="title">{recipe.name || recipe.title}</h1>
        <img src={recipe.image} alt={recipe.title} />
      </div>
      <div className="percent">
        <p>Health Score: {recipe.healthScore}%</p>
      </div>
    
      <h3>What's it about?</h3>
      {/* Renderizar el resumen directamente */}
      {recipe.summary.split('\n').map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
      <div className="diets">
        <h3>Diet Type: </h3>
        {recipe.diets.map((d, index) => (
          <span key={index}>{d} <br /></span>
        ))}
      </div>
      
      
      <h3>Step by Step!</h3>
      {/* Renderizar las instrucciones directamente */}
      {recipe.instructions.split('\n').map((instruction, index) => (
        <p key={index}>{instruction}</p>
      ))}

      <div>
        <NavLink className="back" to={"/home"}>
          Go back 🏠
        </NavLink>
      </div>
    </div>
  );
}
