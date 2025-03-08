import React, { Component } from "react";
import RadioButton from "./RadioButton";
import "../assets/css/Subcategories.css";
import { PropTypes } from "prop-types";

class HikingSubcategories extends Component {
  state = {
    types: { category: ["Hills", "Mountains", "Lakes", "Caves"] },
  };

  render() {
    const { types } = this.state;
    const { selected, handleOptionChange, handleArrowClick } = this.props;

    return (
      <div className="subcategory">
        <i className="arrow-icon left" onClick={() => handleArrowClick()}></i>
        <h6 className="subcategory__title">Hiking</h6>
        <div className="subcategory__group subcategory__hiking">
          {types.category.map((elem) => (
            <RadioButton
              key={elem}
              name="hiking"
              type={elem}
              selected={selected.hiking.category}
              onChange={handleOptionChange}
            />
          ))}
        </div>
      </div>
    );
  }
}
HikingSubcategories.propTypes = {
  handleOptionChange: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
};
export default HikingSubcategories;
