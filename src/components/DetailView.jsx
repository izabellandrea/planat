import React, { useState, useEffect } from "react";
import MapContainer from "./MapContainer";
import Slider from "react-slick";
import { useHistory } from "react-router-dom";
import { apiRequest } from "../utils";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../assets/css/DetailView.css";
import Modal from "react-modal";
import RecommendationsCarousel from "./RecommendationsCarousel";
import "../assets/css/MapModal.css";
import { MdZoomOutMap } from "react-icons/md";
import { GrClose } from "react-icons/gr";
import Install from "./install";


const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    background: "none",
    overflow: "hidden",
    border: "none",
    display: "flex",
    width: "90%",
    height: "90%",
    transform: "translate(-50%, -50%)",
    zIndex: "4",
  },
  overlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: " rgba(0,0,0,.4)",
    zIndex: "4",
  },
};

function DetailView() {
  
  const [searchPin, setSearchPin] = useState([46.3143, 25.3078]);
  const [images, setImages] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [details, setDetails] = useState({
    formatted_address: "",
    formatted_phone_number: "",
    geometry: [0.0, 0.0],
    name: "",
    opening_hours: ["", ""],
    website: "",
    rating: 0,
  });

  let settings = {
    infinite: true,
    speed: 1000,
    arrows: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 960,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 560,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const history = useHistory();

  const markerForMap = [
    {
      name: details.name,
      geometry: {
        location: {
          lat: new URLSearchParams(history.location.search).get("lat"),
          lng: new URLSearchParams(history.location.search).get("lng"),
        },
      },
    },
  ];


  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    let place_id = new URLSearchParams(history.location.search).get("place_id");
    let urlDetails = `details/json?place_id=${place_id}&language=en&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`;
    
    let img =
      "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=";
    let photos = [];
    let res = {};

    apiRequest(urlDetails).then(
      (response) => {
        res = response.result;
        let open = res.opening_hours
          ? res.opening_hours.weekday_text
          : res.opening_hours;

        setDetails({
          formatted_address: res.formatted_address,
          formatted_phone_number: res.formatted_phone_number,
          geometry: [res.geometry.location.lat, res.geometry.location.lng],
          name: res.name,
          opening_hours: open,
          website: res.website,
          rating: res.rating,
        });

        response.result.photos &&
          response.result.photos.forEach((elem) => {
            photos.push(
              `${img}${elem.photo_reference}&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`
            );
          });

        setImages(photos);
        setSearchPin([res.geometry.location.lat, res.geometry.location.lng]);
        setReviews(res.reviews);
      },
      (reject) => console.log(reject)
    );
  }, [history.location.search]);

  
  return (
    details !== null && (
      
      <div className="detail-container">
       
        <Install/>
        <div className="detail-container__body">
        <h1 className="detail-container__title">{details.name}</h1>
          {images.length > 0 ? (
            <Slider {...settings} className="detail-container__body__images">
              {images.map((imageUrl) => (
                <div className="detail-image-wrapper" key={imageUrl}>
                  <img
                    src={imageUrl}
                    alt={imageUrl}
                    key={imageUrl}
                    className="detail-container__body__image"
                  />
                </div>
              ))}
            </Slider>
          ) : (
            <h1 className="image-not-found">No images were found :(</h1>
          )}

          <div className="detail-container__body__infos">
               
            <div className="detail-conatiner__body__infos--left">
              <p className="detail-container__body__info--bold"> Address:</p>
              <p className="detail-container__body__info--normal">
                {details.formatted_address}
              </p>
              {details.rating && (
                <div>
                  <p className="detail-container__body__info--bold">Rating:</p>
                  <p className="detail-container__body__info--normal">
                    {details.rating}
                  </p>
                </div>
              )}

              <p className="detail-container__body__info--bold">Contact: </p>
              <p>{details.formatted_phone_number}</p>
              {details.website && (
                <div>
                  <p className="detail-container__body__info--bold">Website:</p>
                  <a href={details.website} target="blank">
                    {details.website}
                  </a>
                </div>
              )}
            </div>
            <div className="detail-container__body__infos--right">
              <p className="detail-container__body__info--bold">
                Opening Hours:
              </p>
              {details.opening_hours &&
                details.opening_hours.map((hour, i) => (
                  <p key={i} className="detail-container__body__info--normal">
                    {hour}
                  </p>
                ))}
              {!details.opening_hours && (
                <p className="detail-container__body__info--normal">
                  No information
                </p>
              )}
            </div>
          </div>

          <h4 className="recommendations__subtitle">Reviews</h4>

          <div className="detail-container__reviews">
            {reviews !== undefined && 
            reviews.slice(1, 5).map((rev, i) => (
              <div className="reviews-item" key={i}>
                <div className="reviews-item__header">
                  <img src={rev.profile_photo_url} alt={rev.author_name}></img>
                  <div className="reviews-item__details">
                    <div className="reviews-item__name">{rev.author_name}</div>
                    <div className="reviews-item__time">
                      {rev.relative_time_description}
                    </div>
                  </div>
                </div>
                <p>{rev.text} </p>
              </div>
            ))}
            {reviews === undefined&&<p className="detail-container__reviews">
                  No information
                </p>}
          </div>

          <h4 className="recommendations__subtitle">Location</h4>
          <div className="map-container">
            <MapContainer
              center={searchPin}
              radius={0}
              markers={markerForMap}
            />
            <button className="open-btn" onClick={openModal}>
              <MdZoomOutMap />
            </button>
          </div>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            style={customStyles}
            ariaHideApp={false}
          >
            <button className="close_btn" onClick={closeModal}>
              <GrClose />
            </button>
            <div className="modal-container">
              <MapContainer
                center={searchPin}
                radius={0}
                markers={markerForMap}
              />
            </div>
          </Modal>
        </div>

        <div className="detail-container__recommendations">
          <h4 className="recommendations__subtitle">
            You might also want to visit
          </h4>
          <RecommendationsCarousel
            url={`nearbysearch/json?location=${new URLSearchParams(
              history.location.search
            ).get("lat")},${new URLSearchParams(history.location.search).get(
              "lng"
            )}&radius=5000&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`}
            className="detail-container__recommendations__slider"
          />
        </div>  
      </div>
    )
  );
}

export default DetailView;
