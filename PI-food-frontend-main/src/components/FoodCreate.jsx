import React, { useState } from "react";
import validation from "./validation";
import "./css/FoodCreate.css";
import { NavLink } from "react-router-dom";
import Logo from '../img/logo.png';
// eslint-disable-next-line
import BackButton from "./BackButton"; 


const initialInputs = {
  title: "",
  healthScore: 0,
  summary: "",
  instructions: "",
  image: "",
  diets: "",
  };

export default function FoodCreate() {
  

  const [alert, setAlert] = useState({ type: "", message: "" });

  function showAlert(type, message) {
    setAlert({ type, message });
    if (type === "success") {
      clearForm();
    }
  }

  async function createRecipe(userData) {
    try {
      const response = await fetch("http://localhost:3001/recipes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });
  
      if (response.ok) {
        console.log(userData);
        showAlert("success", "Recipe created successfully!");
      } else {
        const data = await response.json();
        console.log("Error creating recipe:", data.error);
        showAlert("error", data.error);
      }
    } catch (error) {
      console.log(error);
      showAlert("error", "Recipe already exists in the database");
    }
  }
  
  

  const [inputs, setInputs] = useState({
    title: "",
    healthScore: 0,
    summary: "",
    instructions: "",
    image: "",
    diets: "",
      });

  const [errors, setErrors] = useState({
    title: "",
    healthScore: "",
    summary: "",
    instructions: "",
    image: "",
    diets: "",
     });

  function handleInputChange(e) {
    const { name, value, type, checked } = e.target;

  
    // For checkboxes, handle multiple selections
    if (type === "checkbox") {
      setInputs((prevInputs) => {
        const currentValue = prevInputs[name] || "";
        const newValue = checked
          ? currentValue + (currentValue ? ", " : "") + value 
          : currentValue.replace(new RegExp(value + "(,\\s)?", "g"), ""); // 
    
        return {
          ...prevInputs,
          [name]: newValue,
        };
      });
  
      // Clear the checkbox error when the user interacts with it
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    } else {
      // For other input fields, update normally
      setInputs({
        ...inputs,
        [name]: value,
      });
      
      // Validate other input fields
      setErrors(validation({ ...inputs, [name]: value }));
    }
  }
  
  function handleSubmit(e) {
    e.preventDefault();
  
    // Check if all required fields have been filled
    const requiredFields = ["title", "summary", "instructions", "image", "diets"];
    const allFieldsFilled = requiredFields.every(
      (field) => inputs[field].trim() !== ""
    );
  
    // Check if healthScore is valid
    const isHealthScoreValid = inputs.healthScore >= 0 && inputs.healthScore <= 100;
  
    if (!allFieldsFilled || !isHealthScoreValid) {
      // Show error message
      showAlert("error", "Please complete all fields and provide a valid Health Score");
      return;
    }
  
    // Submit the form
    createRecipe(inputs);
  }
  

  function clearForm() {
    setInputs(initialInputs);
    setErrors(initialInputs);
  }



  return (
    
    <div className="food-create">

<div className="back-container"> 
<BackButton /> 
      </div>

      <div className="left-margin"></div>
      <div className="right-margin"></div>

      
      <NavLink  to={'/home'}>
        <img src={Logo} alt="Logo Henry Food Home" width="180px"></img>
      </NavLink>
      

      <h1>Write your own recipe!</h1>
      
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="options">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              name="title"
              value={inputs.title}
              onChange={handleInputChange}
              maxLength={140}
              className={errors.title && "danger"}
            />
            {errors.title && <span>{errors.title}</span>}
          </div>
          <div className="options">
            <label  htmlFor="healthScore">Health Score:</label>
            <input 
  type="number"
  name="healthScore"
  value={inputs.healthScore}
  onChange={(e) => {
    const newValue = e.target.value.slice(0, 3); // Limitar a tres dígitos
    handleInputChange({
      target: {
        name: "healthScore",
        value: newValue,
      },
    });
  }}
  className={` ${errors.healthScore ? "danger" : ""} limitedWidth`}
/>

            {errors.healthScore && <span>{errors.healthScore}</span>}
          </div>
          <div className="options">
            <label htmlFor="summary">Summary:</label>
            <input
              type="text"
              name="summary"
              value={inputs.summary}
              onChange={handleInputChange}
              maxLength={255}
              className={errors.summary && "danger"}
            />
            {errors.summary && <span>{errors.summary}</span>}
          </div>
          <div className="options">
            <label htmlFor="instructions">Instructions:</label>
            <textarea
              name="instructions"
              value={inputs.instructions}
              onChange={handleInputChange}
              rows={6}
              className={errors.instructions && "danger"}
            />
            {errors.instructions && <span>{errors.instructions}</span>}
          </div>
          <div className="options">
            <label htmlFor="image">Add an image (URL):</label>
            <input
              type="text"
              name="image"
              value={inputs.image}
              placeholder="https://..........image.jpg"
              onChange={handleInputChange}
               className={errors.image && "danger"}
            />
            {errors.image && <span>{errors.image}</span>}
          </div>


          <div className="options">
            <label  htmlFor="diets" className="label-style"><b>Diet Type:</b></label>
            <div className="checkbox-column"> 

            <div>
              <input
                type="checkbox"
                name="diets"
                value="Omnivorous"
                checked={inputs.diets.includes("Omnivorous")}
                onChange={handleInputChange}
              />
              <label>Omnivorous</label>
            </div>
          
            <div>
              <input
                type="checkbox"
                name="diets"
                value="Dairy free"
                checked={inputs.diets.includes("Dairy free")}
                onChange={handleInputChange}
              />
              <label>Dairy free</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="diets"
                value="Fodmap friendly"
                checked={inputs.diets.includes("Fodmap friendly")}
                onChange={handleInputChange}
              />
              <label>Fodmap friendly</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="diets"
                value="Gluten free"
                checked={inputs.diets.includes("Gluten free")}
                onChange={handleInputChange}
              />
              <label>Gluten free</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="diets"
                value="Ketogenic"
                checked={inputs.diets.includes("Ketogenic")}
                onChange={handleInputChange}
              />
              <label>Ketogenic</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="diets"
                value="Lacto ovo vegetarian"
                checked={inputs.diets.includes("Lacto ovo vegetarian")}
                onChange={handleInputChange}
              />
              <label>Lacto ovo vegetarian</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="diets"
                value="Paleolithic"
                checked={inputs.diets.includes("Paleolithic")}
                onChange={handleInputChange}
              />
              <label>Paleolithic</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="diets"
                value="Pescatarian"
                checked={inputs.diets.includes("Pescatarian")}
                onChange={handleInputChange}
              />
              <label>Pescatarian</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="diets"
                value="Primal"
                checked={inputs.diets.includes("Primal")}
                onChange={handleInputChange}
              />
              <label>Primal</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="diets"
                value="Vegan"
                checked={inputs.diets.includes("Vegan")}
                onChange={handleInputChange}
              />
              <label>Vegan</label>
            </div>
            <div>
              <input
                type="checkbox"
                name="diets"
                value="Whole 30"
                checked={inputs.diets.includes("Whole 30")}
                onChange={handleInputChange}
              />
              <label>Whole 30</label>
            </div>
            {errors.diets && <span>{errors.diets}</span>}
          </div>
          </div>
           
     


        {alert.message && (
        <div className={`create-alert ${alert.type}`}>
          {alert.message}
          <button onClick={() => setAlert({ type: "", message: "" })}>x</button>
        </div>)}


          <div className="buttonCreate">
          <button>ADD TO MY COOK BOOK</button>
          </div>
        </form>

        <NavLink className="back" to={"/home"}>
         Go back 🏠
        </NavLink>
        </div>
      
    </div>
    
    
  );
}
