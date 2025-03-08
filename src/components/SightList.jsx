import React, { Component } from "react";
import SightListElement from "./SightListElement";
import "../assets/css/SightList.css";
import PropTypes from "prop-types";

class SightList extends Component {
  render() {
    const { sightList } = this.props;
    return (
      <div className="sight-list">
        {!sightList.length && (
          <h2 className="sight-list__no-results">No results found</h2>
        )}
        {sightList
          .sort((a, b) => Math.random() - 0.5)
          .map((elem) => (
            <SightListElement
              key={elem.place_id}
              image={
                elem.photos
                  ? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=450&max&photoreference=${elem.photos[0].photo_reference}&key=${process.env.REACT_APP_GOOGLE_PLACES_API_KEY}`
                  : ""
              }
              city={elem.formatted_address}
              name={elem.name}
              place_id={elem.place_id}
              lat={elem.geometry.location.lat}
              lng={elem.geometry.location.lng}
              price_level={elem.price_level}
            />
          ))}
      </div>
    );
  }
}

SightList.propTypes = {
  sightList: PropTypes.array.isRequired,
};

export default SightList;
