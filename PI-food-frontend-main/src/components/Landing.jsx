import React from "react";
import { NavLink } from "react-router-dom";
import LogoLanding from '../img/logolanding.png'
import video from '../img/video-bg.mp4'
import "./css/Landing.css"


export default function LandingPage(){
    return (
        <div className="landing-container">
            <video src={video} autoPlay loop muted className="video"></video>
            
            
            <div className="enterColum">
                <img className="logo-landing" src={LogoLanding} alt="Henry Food Logo" width="250"></img>
                <NavLink  to={'/home'}>
                    <button className="entrar">ENTER</button>
                </NavLink>
                </div>
                                
              
        </div>
    )
}
