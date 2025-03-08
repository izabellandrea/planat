import React, { useState/*, useEffect*/ } from "react";
import SearchBar from "./SearchBar";
import Recommendations from "./Recommendations";
import "../assets/css/Home.css";
import NewYork from "../assets/images/NewYork.png"

const Home = () => {
  window.scrollTo(0, 0);
  const cities = ["London", "Paris", "Brasov", "Budapest", "Cluj"];

  const [radius, setRadius] = useState(5);
  const [recPlace] = useState(
    cities[Math.floor(Math.random() * cities.length)])

  let sliderValueChange = (value) => {
    setRadius(value);
  };


  return (
    <div>
      <div className="home_page">
      <div className="title"><h1>Let the adventure begin</h1></div>
      <img className="d-block w-100" src={NewYork}  alt="BannerImage"/>

        <div className="wrapper">
          <SearchBar radius={radius} onSliderValueChange={sliderValueChange} />
          <Recommendations location={recPlace}  />
        </div>
      </div>
    </div>
  );
};
export default Home;
