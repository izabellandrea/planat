import React, { Component } from "react";
import RadioButton from "./RadioButton";
import "../assets/css/Subcategories.css";
import { PropTypes } from "prop-types";
class SportSubcategories extends Component {
  state = {
    types: {
      category: ["Regular", "Extreme"],
      option1: ["Water", "Land", "Air"],
      option2: ["Indoor", "Outdoor"],
    },
  };

  render() {
    const { types } = this.state;
    const { selected, handleOptionChange, handleArrowClick } = this.props;
    const count = selected.sport.category !== "Extreme" ? 2 : 3;

    return (
      <div className="subcategory">
        <i className="arrow-icon left" onClick={() => handleArrowClick()}></i>
        <h6 className="subcategory__title">Sport</h6>
        <div className="subcategory__group subcategory__sport">
          {types.category.map((elem) => (
            <RadioButton
              key={elem}
              name="sport"
              type={elem}
              selected={selected.sport.category}
              onChange={handleOptionChange}
            />
          ))}
        </div>
        {selected.sport.category !== null && (
          <div className="subcategory__group subcategory__sport">
            {types.option1.slice(0, count).map((elem) => (
              <RadioButton
                key={elem}
                name="sport.sub"
                type={elem}
                selected={selected.sport.subcategory}
                onChange={handleOptionChange}
              />
            ))}
          </div>
        )}
        {selected.sport.subcategory !== null && selected.subcategory !== "Air" && (
          <div className="subcategory__group subcategory__sport">
            {types.option2.map((elem) => (
              <RadioButton
                key={elem}
                name="sport.sub2"
                type={elem}
                selected={selected.sport.subsubcategory}
                onChange={handleOptionChange}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}
SportSubcategories.propTypes = {
  handleOptionChange: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
};

export default SportSubcategories;
