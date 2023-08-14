import React from 'react';
import logo from "../img/looading.png"
import '../components/css/LoadingAnimation.css';

const LoadingAnimation = () => {
    return (
      <div className="loading-animation">
       <img src={logo} className="App-logo App-logo-spin" alt="logo" />
      </div>
    );
};

export default LoadingAnimation;

