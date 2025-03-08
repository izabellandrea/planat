import React from "react";
import CardsComponent from "./CardsComponent";
import RecommendationsCarousel from "./RecommendationsCarousel";
import "../assets/css/Recommendations.css";
import BurjKhalifa from "../assets/images/BurjKhalifa.png"
import Louvre from "../assets/images/Louvre.png"
import Area47 from "../assets/images/Area47.png"
import GrandCanyon from "../assets/images/GrandCanyon.png"
import Pyramid from "../assets/images/Pyramid.png"
import Robot from "../assets/images/Robot.png"


function Recommendations(props) {


  return (
    <div className="recommendations">
      <div className="recommendations__container">
      <h6 className="recommendations__title">Discover popular attractions</h6>
      <div className="recommendations__cards">
    
          <CardsComponent
            key={1}
            name={"Burj Khalifa"}
            img={BurjKhalifa }
            address={"1 Sheikh Mohammed bin Rashid Blvd-Downtown Dubai-Dubai-United Arab Emirates"}
            place_id={"ChIJS-JnijRDXz4R4rfO4QLlRf8"}
            lat={25.197197}
            lng={55.27437639999999}
          />
          <CardsComponent
            key={2}
            name={"Louvre"}
            img={ Louvre}
            address={"Rue de Rivoli, 75001 Paris, France"}
            place_id={"ChIJD3uTd9hx5kcR1IQvGfr8dbk"}
            lat={48.8606111}
            lng={2.337644}
          />
          <CardsComponent
            key={3}
            name={"AREA 47 - Tirol"}
            img={Area47 }
            address={"Ötztaler Achstr. 1, 6430 Ötztal Bahnhof, Austria"}
            place_id={"ChIJLTNXt7jfnEcRXyyXMpmddZU"}
            lat={47.2288}
            lng={10.8444}
          />
          <CardsComponent
            key={4}
            name={"Grand Canyon National Park"}
            img={ GrandCanyon}
            address={"Arizona, United States"}
            place_id={"ChIJFU2bda4SM4cRKSCRyb6pOB8"}
            lat={36.1069258}
            lng={-112.1129484}
          />
          <CardsComponent
            key={5}
            name={"The Great Pyramid of Giza"}
            img={ Pyramid}
            address={"Al Haram, Nazlet El-Semman, Al Giza Desert, Giza Governorate, Egypt"}
            place_id={"ChIJGymPrIdFWBQRJCSloj8vDIE"}
            lat={29.9792345}
            lng={31.1342019}
          />
          <CardsComponent
            key={6}
            name={"Robot Restaurant"}
            img={ Robot}
            address={"Japan, 〒160-0021 Tokyo, Shinjuku City, Kabukicho, 1 Chome−7−7 新宿ロボットビル B2F"}
            place_id={"ChIJNTwnudmMGGARmPP-NzRhQaQ"}
            lat={35.6943187}
            lng={139.7028432}
          />
          

      </div>
      </div>
      <div className="recommendations__container carousel">
      <h5 className="recommendations__title">You might also visit...</h5>
      <RecommendationsCarousel
        url={`textsearch/json?query=food+in+${props.location}&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}
          `}
      />
      </div>
    </div>
  );
}

export default Recommendations;
