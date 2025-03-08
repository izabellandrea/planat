import React, { Component } from "react";
import Select from "react-dropdown-select";
import "../assets/css/SortBy.css";

class SortBy extends Component {
  state = {
    selectedOption: null,
  };

  handleSelect = (option) => {
    this.setState({ selectedOption: option });
  };

  render() {
    const options = [
      { label: "Unsorted", value: "unsorted" },
      { label: "A-Z", value: "az" },
      { label: "Z-A", value: "za" },
      { label: "Price", value: "price" },
    ];
    return (
      <div className="sort-by">
        <label className="sort-by__label">Sort by:</label>
        <Select
          className="sort-by__select"
          options={options}
          onChange={this.props.onSortByOptionChange}
          searchable={false}
        />
      </div>
    );
  }
}

export default SortBy;
