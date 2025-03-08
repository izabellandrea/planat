import React, { Component } from "react";
import { Input } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

class SearchText extends Component {
  state = { inputText: null };

  handleSearchChange = (e) => {
    this.setState({ inputText: e.target.value });
  };

  render() {
    return (
      <Input
        icon="search"
        placeholder="Search"
        onChange={this.props.onTextInputChange}
      />
    );
  }
}

export default SearchText;
