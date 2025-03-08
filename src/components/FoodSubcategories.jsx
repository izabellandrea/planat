import React, { Component } from "react";
import RadioButton from "./RadioButton";
import "../assets/css/Subcategories.css";
import { PropTypes } from "prop-types";

class FoodSubcategories extends Component {
  state = {
    types: {
      category: ["Food", "Drink"],
      option1: ["Fast", "Restaurant"],
      option2: ["Bar Pub", "Winery"],
    },
  };

  render() {
    const { types } = this.state;
    const { selected, handleOptionChange, handleArrowClick } = this.props;
    let options = null;

    if (selected.food.category === "Food") {
      options = types.option1;
    } else options = types.option2;

    return (
      <div className="subcategory">
        <i className="arrow-icon left" onClick={() => handleArrowClick()}></i>
        <h6 className="subcategory__title">Food/Drink</h6>
        <div className="subcategory__group subcategory__food">
          {types.category.map((elem) => (
            <RadioButton
              key={elem}
              name="food"
              type={elem}
              selected={selected.food.category}
              onChange={handleOptionChange}
            />
          ))}
        </div>
        {selected.food.category !== null && (
          <div className="subcategory__group subcategory__food">
            {options.map((elem) => (
              <RadioButton
                key={elem}
                name="food.sub"
                type={elem}
                selected={selected.food.subcategory}
                onChange={handleOptionChange}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

FoodSubcategories.propTypes = {
  handleOptionChange: PropTypes.func.isRequired,
  selected: PropTypes.object.isRequired,
};

export default FoodSubcategories;
