import React, { Component } from "react";
import RadioButton from "./RadioButton";
import "../assets/css/Subcategories.css";

class EntertainmentSubcategories extends Component {
  state = {
    types: {
      category: ["Indoor", "Outdoor"],
      option1: ["Cinema", "Wellness", "Shopping"],
      option2: ["Adventure Playground", "Other"],
    },
  };

  render() {
    const { types } = this.state;
    const { selected, handleOptionChange, handleArrowClick } = this.props;
    let options = null;

    if (selected.entertainment.category === "Indoor") {
      options = types.option1;
    } else options = types.option2;

    return (
      <div className="subcategory">
        <i className="arrow-icon left" onClick={() => handleArrowClick()}></i>
        <h6 className="subcategory__title">Entertainment</h6>
        <div className="subcategory__group subcategory__entertainment">
          {types.category.map((elem) => (
            <RadioButton
              key={elem}
              name="entertainment"
              type={elem}
              selected={selected.entertainment.category}
              onChange={handleOptionChange}
            />
          ))}
        </div>
        {selected["entertainment"].category !== null && (
          <div className="subcategory__group subcategory__entertainment">
            {options.map((elem) => (
              <RadioButton
                key={elem}
                name="entertainment.sub"
                type={elem}
                selected={selected.entertainment.subcategory}
                onChange={handleOptionChange}
              />
            ))}
          </div>
        )}
      </div>
    );
  }
}

export default EntertainmentSubcategories;
