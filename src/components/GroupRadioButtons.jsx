import React, { Component } from "react";
import RadioButton from "./RadioButton";
import "../assets/css/GroupRadioButtons.css";

class GroupRadioButtons extends Component {
  state = { types: ["Alone", "Pair", "Group"] };

  render() {
    const { types } = this.state;

    return (
      <div className="group-select">
        <div className="group-select__radio-buttons">
          {types.map((radioButton) => (
            <RadioButton
              key={radioButton}
              name="groupOption"
              selected={this.props.selected}
              type={radioButton}
              onChange={this.props.onChange}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default GroupRadioButtons;
