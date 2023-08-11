import { React } from "react";

import "./css/Home.css";
import CardsContainer from "./CardsContainer";
import Footer from "./Footer";


export default function Home() {


  return (
    <div className="home">
   
      <CardsContainer />
      <Footer />
    </div>
  );
}
