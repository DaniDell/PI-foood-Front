import React from "react";
import { useNavigate } from "react-router-dom";
import Back from '../img/back.png';

function BackButton() {
  const navigate = useNavigate();

  function goBack() {
    navigate(-1); // Regresa a la página anterior
  }

  return (
    <img
      className="back-button"
      src={Back}
      alt="Go back"
      onClick={goBack}
    />
  );
}

export default BackButton;