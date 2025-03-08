import React, { Component } from "react";
import PropTypes from "prop-types";

class RadioButton extends Component {
  render() {
    const { type, selected, onChange, name } = this.props;

    return (
      <div className="labeled-radio">
        <input
          className="radio-button"
          type="radio"
          name={name}
          value={type}
          checked={selected === type}
          onChange={() => onChange([{ name }, { type }])}
        />
        <label>{type}</label>
      </div>
    );
  }
}

RadioButton.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  selected: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

RadioButton.defaultProps = {
  selected: null,
};

export default RadioButton;
