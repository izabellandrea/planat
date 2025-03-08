import React, { useState } from "react";
import SearchBar from "./SearchBar";
import SearchResults from "./SearchResults";

function Search() {
  const [searchResults, setSearchResults] = useState([]);
  const [filteredSearchResults, setFilteredSearchResults] = useState([]);
  const [mapCenter, setMapCenter] = useState([46.3143, 25.3078]);
  const [radius, setRadius] = useState(5);
  const [sortOption, setSortOption] = useState("Unsorted");
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(true);

  const changeLoading = (loading) => {
    setLoading(loading);
  };

  const handleSearch = (results) => {
    setSearchResults((searchResults) =>
      [...searchResults, ...results].filter(
        (newResults, index, self) =>
          index ===
          self.findIndex(
            (elem) =>
              elem.place === newResults.place && elem.name === newResults.name
          )
      )
    );
    setFilteredSearchResults((searchResults) =>
      [...searchResults, ...results].filter(
        (newResults, index, self) =>
          index ===
          self.findIndex(
            (elem) =>
              elem.place === newResults.place && elem.name === newResults.name
          )
      )
    );
  };

  const handleMapCenterChange = (center) => {
    setMapCenter(center);
  };

  const sliderValueChange = (value) => {
    setRadius(value);
  };

  const filterByInputText = (e) => {
    setInputText(e.target.value);
    setFilteredSearchResults(
      sortByOption(searchResults, sortOption).filter(function (result) {
        return result.name.toLowerCase().includes(e.target.value.toLowerCase());
      })
    );
  };

  const sortByOption = (results, option) => {
    switch (option) {
      case "A-Z":
        return [...results].sort((a, b) =>
          a.name > b.name ? 1 : b.name > a.name ? -1 : 0
        );
      case "Z-A":
        return [...results].sort((a, b) =>
          a.name < b.name ? 1 : b.name < a.name ? -1 : 0
        );
      case "No sort":
        return results;
      default:
        break;
    }
  };

  const handleSortByOptionChange = (e) => {
    setSortOption(e[0].label);
    setFilteredSearchResults(
      sortByOption(searchResults, e[0].label).filter(function (result) {
        return result.name.toLowerCase().includes(inputText.toLowerCase());
      })
    );
  };

  return (
    <div className="search__holder">
      <SearchBar
        onSearch={handleSearch}
        mapCenter={mapCenter}
        radius={radius}
        onMapCenterChange={handleMapCenterChange}
        onSliderValueChange={sliderValueChange}
        onFetch={changeLoading}
      />
      <SearchResults
        results={filteredSearchResults}
        mapCenter={mapCenter}
        radius={radius}
        onTextInputChange={filterByInputText}
        onSortByOptionChange={handleSortByOptionChange}
        loading={loading}
      />
    </div>
  );
}

export default Search;
