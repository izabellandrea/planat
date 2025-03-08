import React, { Component } from "react";
import RadioButton from "./RadioButton";
import CheckBox from "./CheckBox";
import "../assets/css/Subcategories.css";
import { PropTypes } from "prop-types";

class CultureSubcategories extends Component {
  state = {
    types: {
      category: ["Building", "Monument"],
      option1: ["Museum", "Theatre", "Other"], //checkbox
    },
  };

  render() {
    const { types } = this.state;
    const {
      selected,
      checked,
      handleOptionChange,
      handleCheckBoxChange,
      handleArrowClick,
    } = this.props;

    return (
      <div className="subcategory">
        <i className="arrow-icon left" onClick={() => handleArrowClick()}></i>
        <h6 className="subcategory__title">Culture</h6>
        <div className="subcategory__group subcategory__culture">
          {types.category.map((elem, i) => (
            <RadioButton
              key={i}
              name="culture"
              type={elem}
              selected={selected.culture.category}
              onChange={handleOptionChange}
            />
          ))}
        </div>

        {selected.culture.category === "Building" && (
          <div className="subcategory__group subcategory__culture">
            {types.option1.map((elem, i) => (
              <CheckBox
                key={i}
                name="culture.sub"
                checked={checked}
                type={elem}
                handleCheckBoxChange={handleCheckBoxChange}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

CultureSubcategories.propTypes = {
  handleOptionChange: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
  checked: PropTypes.object.isRequired,
  handleCheckBoxChange: PropTypes.func.isRequired,
};
export default CultureSubcategories;
