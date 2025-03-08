import React, { Component } from "react";
import PlacesAutocomplete from "react-places-autocomplete";
import RangeSlider from "./RangeSlider";
import PropTypes from "prop-types";
import "../assets/css/AutocompleteSearch.css";
import Pin from "../assets/images/pin.svg";

class AutocompleteSearch extends Component {
  render() {
    const {
      handleSearchClick,
      handleLocationChange,
      rangeValue,
      handleSliderInputChange,
      handleSliderValueChange,
      address,
      showSearch,
      onSelect,
    } = this.props;

    return (
      <div className="search-bar__element search " onFocus={handleSearchClick}>
        <label className="search-bar__element-title">Location</label>
        <PlacesAutocomplete
          value={address}
          onChange={handleLocationChange}
          onSelect={onSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => {
            return (
              <div className="location-search-container">
                <div className="input-wrapper">
                  <input
                    {...getInputProps({
                      placeholder: "Search Places ...",
                      className: "location-search-input",
                    })}
                  />
                  <span
                    className="location-search-span"
                    onClick={handleSearchClick}
                  >
                    {rangeValue} km nearby
                  </span>
                </div>
                <div className="autocomplete-dropdown-container">
                  <div
                    className={`search-bar__popup${showSearch ? " open" : ""}`}
                  >
                    <div className="suggestion-container">
                      {loading && <div>Loading...</div>}
                      {suggestions.map((suggestion) => {
                        return (
                          <div
                            {...getSuggestionItemProps(suggestion, {
                              className: "suggestion-item",
                              key: suggestion.placeId,
                            })}
                            key={suggestion.placeId}
                          >
                            <span>
                              <img src={Pin} className="pin" alt="pin.svg" />
                              {suggestion.description
                                .split(",")
                                .slice(0, 2)
                                .join(",")}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <RangeSlider
                      value={rangeValue}
                      onSliderChange={handleSliderValueChange}
                      onInputChange={handleSliderInputChange}
                    />
                  </div>
                </div>
              </div>
            );
          }}
        </PlacesAutocomplete>
      </div>
    );
  }
}

AutocompleteSearch.propTypes = {
  handleSearchClick: PropTypes.func.isRequired,
  handleLocationChange: PropTypes.func.isRequired,
  rangeValue: PropTypes.number.isRequired,
  handleSliderInputChange: PropTypes.func.isRequired,
  handleSliderValueChange: PropTypes.func.isRequired,
  address: PropTypes.string.isRequired,
  showSearch: PropTypes.bool.isRequired,
};

AutocompleteSearch.defaultProps = {
  rangeValue: 5,
};

export default AutocompleteSearch;
