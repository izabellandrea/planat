import React, { useState, useEffect } from "react";
import CardsComponent from "./CardsComponent";
import Slider from "react-slick";
import { apiRequest } from "../utils";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ImagePlaceHolder from "../assets/images/image-placeholder.svg";

function RecommendationsCarousel(props) {
  const [places, setPlaces] = useState([]);
  
  useEffect(() => {
    let result = [];
    let url = props.url;
    apiRequest(url).then(
      
      (response) => {
        if(response!== undefined ){
        response.results.slice(0, 5).forEach((item, i) => {
          result.push(item);
        });
        setPlaces(result);
      }
      },
      (reject) => console.log(reject)
    );
  },[props]);

  let settings = {
    infinite: true,
    speed: 1000,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 3500,

    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 769,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1.05,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const MapsUrl =
    "https://maps.googleapis.com/maps/api/place/photo?maxwidth=450&max&photoreference=";

  return (
    <div className="carousel-container">
      {places.length === 0 ? (
        <div className="container__spinner-border" role="status">
          <span className="container__sr-only">Loading...</span>
        </div>
      ) : (
        <Slider {...settings}
        aria-hidden="false"
        >
          {places.map((elem, i) => (
            <CardsComponent
              key={i}
              name={elem.name}
              img={
                elem.photos
                  ? `${MapsUrl}${elem.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`
                  : ImagePlaceHolder
              }
              place_id={elem.place_id}
              address={
                elem.formatted_address ? elem.formatted_address : elem.vicinity
              }
              price_level={elem.price_level}
              lat={elem.geometry.location.lat}
              lng={elem.geometry.location.lng}
            />
          ))}
        </Slider>
      )}
    </div>
  );
}

export default RecommendationsCarousel;
