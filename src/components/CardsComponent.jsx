import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class CardsComponent extends Component {
  render() {
    const {
      name,
      img,
      address,
      place_id,
      price_level,
      open,
      lat,
      lng,
    } = this.props;

    var price = "";

    for (var i = 1; i <= price_level; i++) {
      price += "$";
    }

    return (
      <div className="card">
        <a href={img} target="blank" className="card__image-holder">
          <img
            className="card__image"
            src={img}
            alt={name}
            referrerPolicy="no referrer"
          ></img>
        </a>
        <div className="card__body">
          <h3 className="card__body__title">{name}</h3>
          
          <h2 className="card__body__address"> {address}</h2>
          {open !== undefined && (
            <p className="card__body__details">
              {open ? "Open now" : "Closed"}
            </p>
          )}
          {price_level && (
            <p className="card__body__details">Price level: {price}</p>
          )}

          <Link
            className="card__body__btn"
            to={`/details?place_id=${place_id}&lat=${lat}&lng=${lng}`}
            target="_blank"
          >
            Details
          </Link>
        </div>
      </div>
    );
  }
}

CardsComponent.propTypes = {
  name: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  address: PropTypes.string,
};

export default CardsComponent;
