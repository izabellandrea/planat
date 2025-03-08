import React from "react";
import SightList from "./SightList";
import MapContainer from "./MapContainer";
import "../assets/css/SightList.css";
import "../assets/css/SearchBar.css";
import "../assets/css/SearchResults.css";
import PropTypes from "prop-types";
import { getDistance } from "geolib";

function SearchResults(props) {
  let filteredResults = props.results.filter(
    (elem) =>
      getDistance(
        { latitude: props.mapCenter[0], longitude: props.mapCenter[1] },
        {
          latitude: elem.geometry.location.lat,
          longitude: elem.geometry.location.lng,
        }
      ) <
      props.radius * 1000
  );

  return (
    <div className="search-results">
      <div className="search-results__sightlist-filter-container">
      
        {props.loading ? (
          <div className="loader"></div>
        ) : (
          <SightList sightList={filteredResults} />
        )}
      </div>
      <MapContainer
        center={props.mapCenter}
        radius={props.radius * 1000}
        markers={filteredResults}
      />
    </div>
  );
}

SearchResults.propTypes = {
  results: PropTypes.array.isRequired,
  mapCenter: PropTypes.array.isRequired,
  radius: PropTypes.number.isRequired,
};

export default SearchResults;
