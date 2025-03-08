import React, { Component } from "react";
import Slider from "rc-slider";
import PropTypes from "prop-types";
import "rc-slider/assets/index.css";
import "../assets/css/RangeSlider.css";

class RangeSlider extends Component {
  render() {
    const min = 5;
    const max = 50;

    return (
      <div className="location-range">
        <div className="location-range__input-group">
          <label htmlFor="input" className="range-label">Area: </label>
          <input
            className="range-input"
            type="number"
            onChange={this.props.onInputChange}
            value={this.props.value}
            id="input"
          />
          <label className="range-label unit">km</label>
        </div>
        <div className="location-range__slider">
          <Slider
            min={min}
            max={max}
            marks={{ [min]: `${min} km`, [max]: `${max} km` }}
            onChange={this.props.onSliderChange}
            value={this.props.value}
          />
        </div>
      </div>
    );
  }
}

RangeSlider.propTypes = {
  value: PropTypes.number.isRequired,
  onSliderChange: PropTypes.func.isRequired,
  onInputChange: PropTypes.func.isRequired,
};

RangeSlider.defaultProps = {
  value: 5,
};

export default RangeSlider;
