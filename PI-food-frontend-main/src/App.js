import "./App.css";
import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Landing from "./components/Landing";
import Home from "./components/Home";
import FoodCreate from "./components/FoodCreate";
import Nav from "./components/Nav";
import Detail from "./components/Detail";
import axios from "axios";


axios.defaults.baseURL = 'http://localhost:3001';


function App() {
  const location = useLocation();

  const shouldShowSearchBar =
    !["/", "/foodcreate"].includes(location.pathname) &&
    !location.pathname.startsWith("/recipes/"); 


  return (
    <div className="App">
      {shouldShowSearchBar && <Nav />}
      <Routes>
        <Route exact path="/" element={<Landing />} />
        <Route path="/home" element={<Home />} />
        <Route path="/foodcreate" element={<FoodCreate />} />
        <Route path="/recipes/:recipeId" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
