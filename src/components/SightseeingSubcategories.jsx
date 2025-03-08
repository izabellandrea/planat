import React, { Component } from "react";
import RadioButton from "./RadioButton";
import CheckBox from "./CheckBox";
import "../assets/css/Subcategories.css";
import { PropTypes } from "prop-types";

class SightseeingSubcategories extends Component {
  state = {
    types: {
      category: ["On Foot", "Bycicle", "Bus", "Boat"],
      option1: ["Building", "Monument", "Park"],
      option2: ["Museum", "Theatre", "Other"], //checkbox
      option3: ["Guided", "Unguided"],
    },
  };

  render() {
    const { types } = this.state;
    const {
      handleOptionChange,
      handleCheckBoxChange,
      handleArrowClick,
      checked,
      selected,
    } = this.props;

    return (
      <div className="subcategory">
        <i className="arrow-icon left" onClick={() => handleArrowClick()}></i>
        <h6 className="subcategory__title">Sightseeing</h6>
        <div className="subcategory__group subcategory__sightseeing">
          {types.category.map((elem) => (
            <RadioButton
              key={elem}
              name="sight"
              type={elem}
              selected={selected.sight.category}
              onChange={handleOptionChange}
            />
          ))}
        </div>
        {(selected.sight.category === "On Foot" ||
          selected.sight.category === "Bycicle") && (
          <div className="subcategory__group subcategory__sightseeing">
            {types.option1.map((elem) => (
              <RadioButton
                key={elem}
                name="sight.sub"
                type={elem}
                selected={selected.sight.subcategory}
                onChange={handleOptionChange}
              />
            ))}
          </div>
        )}

        {(selected.sight.category === "On Foot" ||
          selected.sight.category === "Bycicle") &&
          selected.sight.subcategory === "Building" && (
            <div className="subcategory__group subcategory__sightseeing">
              {types.option2.map((elem, i) => (
                <CheckBox
                  key={i}
                  name="sight.sub"
                  type={elem}
                  checked={checked}
                  handleCheckBoxChange={handleCheckBoxChange}
                />
              ))}
            </div>
          )}
        <div className="subcategory__group subcategory__sightseeing">
          {types.option3.map((elem) => (
            <RadioButton
              key={elem}
              name="sight.sub2"
              type={elem}
              selected={selected.sight.subsubcategory}
              onChange={handleOptionChange}
            />
          ))}
        </div>
      </div>
    );
  }
}
SightseeingSubcategories.propTypes = {
  handleOptionChange: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
  checked: PropTypes.object.isRequired,
  handleCheckBoxChange: PropTypes.func.isRequired,
};
export default SightseeingSubcategories;
