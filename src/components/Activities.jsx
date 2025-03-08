import React, { Component } from "react";
import SportSubcategories from "./SportSubcategories";
import HikingSubcategories from "./HikingSubcategories";
import FoodSubcategories from "./FoodSubcategories";
import CultureSubcategories from "./CultureSubcategories";
import SightseeingSubcategories from "./SightseeingSubcategories";
import EntertainmentSubcategories from "./EntertainmentSubcategories";
import PropTypes from "prop-types";

class Activities extends Component {
  render() {
    const {
      handleActivityFocus,
      handleActivityClick,
      handleCheckBoxChange,
      handleOptionChange,
      handleArrowClick,
      selected,
      selectedActivity,
      showActivities,
      name,
      checked,
      selectedCategories,
    } = this.props;

    return (
      <div className="search-bar__element activities">
        <label className="search-bar__element-title">Activities</label>
        <div className="search-bar__display" onClick={handleActivityFocus}>
          {selectedCategories ? selectedCategories : "Select activities..."}
        </div>

        <div className={`search-bar__popup${showActivities ? " open" : ""}`}>
          {name.map((elem) => {
            return (
              <div
                key={elem}
                className="activity"
                onClick={() => handleActivityClick(elem)}
              >
                {elem}
                <i className="arrow-icon"></i>
              </div>
            );
          })}
        </div>

        {selectedActivity === "Culture" && (
          <CultureSubcategories
            selected={selected}
            checked={checked}
            handleOptionChange={handleOptionChange}
            handleCheckBoxChange={handleCheckBoxChange}
            handleArrowClick={handleArrowClick}
          />
        )}

        {selectedActivity === "Entertainment" && (
          <EntertainmentSubcategories
            selected={selected}
            handleOptionChange={handleOptionChange}
            handleArrowClick={handleArrowClick}
          />
        )}
        {selectedActivity === "Food/Drink" && (
          <FoodSubcategories
            selected={selected}
            handleOptionChange={handleOptionChange}
            handleArrowClick={handleArrowClick}
          />
        )}
        {selectedActivity === "Hiking" && (
          <HikingSubcategories
            selected={selected}
            handleOptionChange={handleOptionChange}
            handleArrowClick={handleArrowClick}
          />
        )}
        {selectedActivity === "Sightseeing" && (
          <SightseeingSubcategories
            selected={selected}
            checked={checked}
            handleOptionChange={handleOptionChange}
            handleCheckBoxChange={handleCheckBoxChange}
            handleArrowClick={handleArrowClick}
          />
        )}
        {selectedActivity === "Sport" && (
          <SportSubcategories
            selected={selected}
            handleOptionChange={handleOptionChange}
            handleArrowClick={handleArrowClick}
          />
        )}
      </div>
    );
  }
}

Activities.propTypes = {
  handleActivityFocus: PropTypes.func.isRequired,
  handleActivityClick: PropTypes.func.isRequired,
  handleCheckBoxChange: PropTypes.func.isRequired,
  handleOptionChange: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
  selectedActivity: PropTypes.string,
  showActivities: PropTypes.bool.isRequired,
  name: PropTypes.array.isRequired,
  checked: PropTypes.object.isRequired,
};

export default Activities;
