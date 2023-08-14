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
                                
                <div className="DietsType">
                <p className="dietColumn">
  <span className="first-line">Write and discover recipes that fit your diet:</span> <br /> <br /><br />
  🖋️Omnivorous: Enjoy diverse foods without strict rules.<br /><br />
  🖋️Dairy-Free : Exclude all dairy products.<br /><br />
  🖋️FODMAP-Friendly : Reduce hard-to-digest carbs.<br /><br />
  🖋️Gluten-Free : Eliminate gluten-containing grains for celiac or sensitivity.<br /><br />
  🖋️Ketogenic: High fats, low carbs for ketosis, aiding weight loss.<br /><br />
  🖋️Lacto-Ovo Vegetarian: No meat, seafood; dairy and eggs included .<br /><br />
  🖋️Paleolithic: Modelled after ancestral eating, whole foods emphasized.<br /><br />
  🖋️Pescatarian : Seafood, fish included; plant-based yet marine-rich.<br /><br />
  🖋️Primal : Like paleo, some dairy allowed; emphasizes local, organic foods.<br /><br />
  🖋️Vegan : Exclude all animal products; plant-based .<br /><br />
  🖋️Whole30 Diet: 30-day reset, cut out certain foods; reintroduce gradually.<br /><br />
</p>

        </div>
        </div>
    )
}
