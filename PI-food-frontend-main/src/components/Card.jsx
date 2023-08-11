import "./css/Card.css";
import React from "react";
import { Link } from "react-router-dom";

export default function Card({ id, name, diets, healthScore, image }) {
  return (
    <div className="carta">
     
      <Link className="ir-a" to={`/recipes/${id}`}>
        <img src={image} alt={name} />
      </Link>
      <Link to={`/recipes/${id}`}>
      <div className="titulo-container">
      <h2>{name}</h2>
      </div>

      <p>Health Score: {healthScore}%</p>
      <div className="dieta">
        <h4  key={Math.random()}>Diet type</h4>
        <ul>
          {diets?.map((e) => {
            return <li  key={Math.random()}>{e}</li>;
          })}
        </ul>
      </div>
      </Link>
    </div>
  );
}
