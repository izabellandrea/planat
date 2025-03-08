import React, { Component } from "react";
import PropTypes from "prop-types";

class CheckBox extends Component {
  render() {
    const { type, checked, handleCheckBoxChange } = this.props;
    const name = this.props.name.split(".")[0];

    return (
      <div className="labeled-check">
        <input
          className="pa-checkbox"
          key={type}
          type="checkbox"
          name={name}
          value={type}
          checked={checked[name][type]}
          onChange={(e) =>
            handleCheckBoxChange(!checked[name][type], type, name)
          }
        />
        <label>{type}</label>
      </div>
    );
  }
}

CheckBox.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  handleCheckBoxChange: PropTypes.func.isRequired,
  checked: PropTypes.object.isRequired,
};

export default CheckBox;
