import React, { useState, useEffect } from "react";
import Activities from "./Activities";
import { useHistory } from "react-router-dom";
import AutocompleteSearch from "./AutocompleteSearch";
import { apiRequest } from "../utils";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import "../assets/css/AutocompleteSearch.css";
import "../assets/css/SearchBar.css";
import $ from "jquery";

function SearchBar(props) {
  const [showSearch, setShowSearch] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [currentUrl, setCurrentUrl] = useState(null);
  const [selected, setSelected] = useState({
    culture: { category: null, subcategory: null, subsubcategory: null },
    entertainment: { category: null, subcategory: null, subsubcategory: null },
    food: { category: null, subcategory: null, subsubcategory: null },
    hiking: { category: null, subcategory: null, subsubcategory: null },
    sight: { category: null, subcategory: null, subsubcategory: null },
    sport: { category: null, subcategory: null, subsubcategory: null },
  });

  const [checked, setChecked] = useState({
    culture: { Museum: false, Theatre: false, Other: false },
    sight: { Museum: false, Theatre: false, Other: false },
  });

  const history = useHistory();
  
  let initLocation = new URLSearchParams(history.location.search).get(
    "location"
  )
    ? new URLSearchParams(history.location.search).get("location")
    : "";
  const [location, setLocation] = useState(initLocation);
  const [address, setAddress] = useState(initLocation);

  useEffect(() => {
    $(document).mouseup(function (e) {
      const container = $(".search-bar__popup");
      const subcategory = $(".subcategory");

      if (
        !container.is(e.target) &&
        container.has(e.target).length === 0 &&
        subcategory.has(e.target).length === 0 &&
        !$(e.target).hasClass("location-search-input") &&
        !$(e.target).hasClass("search-bar__display") &&
        !$(e.target).hasClass("range-input")
      ) {
        if (showSearch) {
          setShowSearch(false);
        }

        if (showActivities) {
          setShowActivities(false);
        }

        setSelectedActivity(null);
      }
    });
  }, [showActivities, showSearch]);

  const displayCategories = () => {
    let text = "";

    Object.entries(selected).forEach((elem) => {
      if (elem[1].category !== null && !text.includes(elem[1].category)) {
        text = text.concat(
          elem[0].charAt(0).toUpperCase() + elem[0].slice(1) + ", "
        );
      }
    });
    return text.slice(0, -2);
  };

  function handleClick() {
    setLocation(address);


    let paramCat = [];
    let paramSubCat = [];
    let paramSubSubCat = [];

    Object.entries(selected).forEach((elem, index) => {
      if (elem[1].category !== null)
        paramCat.push(elem[1].category.concat(index));
      if (elem[1].subcategory !== null)
        paramSubCat.push(elem[1].subcategory.concat(index));
      if (elem[1].subsubcategory !== null)
        paramSubSubCat.push(elem[1].subsubcategory.concat(index));
    });

    let paramChecked = [];
    Object.entries(checked).forEach((elem, index) => {
      if (elem[1].Museum) paramChecked.push("Museum" + index);
      if (elem[1].Theatre) paramChecked.push("Theatre" + index);
    });

    let newURL = `/search-results?location=${address}&range=${
      props.radius
    }&category=${paramCat.join(",")}&subcategory=${paramSubCat.join(
      ","
    )}&subsubcategory=${paramSubSubCat.join(",")}&checked=${paramChecked.join(
      ","
    )}`;
    setCurrentUrl(newURL);
    if (newURL !== history.location.search && address) {
      history.push(newURL);
    }
  }

  let handleOptionChange = (changed) => {
    let name = changed[0].name.split(".")[0];
    let type = changed[1].type;

    if (changed[0].name.endsWith("sub")) {
      let category = selected[name].category;
      setSelected({
        ...selected,
        [name]: { category: category, subcategory: type, subsubcategory: null },
      });
    } else if (changed[0].name.endsWith("sub2")) {
      let { category, subcategory } = selected[name];
      setSelected({
        ...selected,
        [name]: {
          category: category,
          subcategory: subcategory,
          subsubcategory: type,
        },
      });
    } else {
      setSelected({
        ...selected,
        [name]: { category: type, subcategory: null, subsubcategory: null },
      });
    }
  };

  let handleCheckBoxChange = (changed, type, name) => {
    checked[name][type] = changed;

    setChecked({
      ...checked,
      [name]: {
        Museum: checked[name].Museum,
        Theatre: checked[name].Theatre,
        Other: checked[name].Other,
      },
    });
  };

  let handleLocationChange = (address) => {
    setAddress(address);
  };

  let handleLocationSelect = (address) => {
    setAddress(address);
  };

  let handleSliderInputChange = (e) => {
    props.onSliderValueChange(e.target.value);
  };

  let handleActivityFocus = () => {
    setSelectedActivity(null);
    setShowActivities(!showActivities);
    setShowSearch(false);
  };

  let handleLocationClick = () => {
    setShowSearch(true);
    setShowActivities(false);
    setSelectedActivity(null);
  };

  let handleActivityClick = (selected) => {
    setSelectedActivity(selected);
  };

  const handleArrowClick = () => {
    setSelectedActivity(null);
  };

  let fetchCategories = (lat, lng) => {
    let queryParams = [];

    let params = new URLSearchParams(history.location.search);
    const paramCat = params.get("category").split(",");
    const paramSubCat = params.get("subcategory").split(",");
    const paramSubSubCat = params.get("subsubcategory").split(",");
    const paramChecked = params.get("checked").split(",");
    let selectedCopy = selected;
    let checkedCopy = checked;

    paramCat.forEach((elem) => {
      let category = Object.keys(selectedCopy)[elem.slice(-1)];
      let option = elem.slice(0, -1);

      selectedCopy[category].category = option;

      if (category === "hiking" || option === "Monument") {
        queryParams.push(option);
      }
    });

    paramSubCat[0] !== "" &&
      paramSubCat.forEach((elem) => {
        selectedCopy[
          Object.keys(selectedCopy)[elem.slice(-1)]
        ].subcategory = elem.slice(0, -1);
      });

    paramSubSubCat[0] !== "" &&
      paramSubSubCat.forEach((elem) => {
        selectedCopy[
          Object.keys(selectedCopy)[elem.slice(-1)]
        ].subsubcategory = elem.slice(0, -1);
      });

    paramChecked[0] !== "" &&
      paramChecked.forEach((elem) => {
        checkedCopy[Object.keys(checkedCopy)[elem.slice(-1)]][
          elem.slice(0, -1)
        ] = true;
      });

    setChecked(checkedCopy);
    setSelected(selectedCopy);

    Object.entries(selectedCopy).forEach((elem) => {
      let query = [];
      if (elem[1].category !== null) {
        query.push(elem[1].category.replaceAll(" ", "+"));
      }

      if (elem[0] === "culture") {
        for (let check in checkedCopy.culture) {
          if (checkedCopy.culture[check]) {
            if (query.includes("Building")) {
              query.splice(query.indexOf("Building"), 1);
            }
            query.push(check);
          }
        }
      }

      if (elem[0] === "sport" && query.includes("Regular")) {
        query.splice(query.indexOf("Regular"), 1);
        query.push("sport");
      }

      if (elem[1].subcategory !== null) {
        if (elem[0] === "sport") {
          query.push("on+" + elem[1].subcategory);
        } else {
          query.push(elem[1].subcategory.replaceAll(" ", "+"));
        }
      }
      if (elem[0] === "sight") {
        for (let check in checkedCopy.sight) {
          if (checkedCopy.sight[check] && query.includes("Building")) {
            query.splice(query.indexOf("Building"), 1);
            query.push(check);
          }
        }
      }
      if (elem[1].subsubcategory !== null) {
        query.push(elem[1].subsubcategory.replaceAll(" ", "+"));
      }

      let url =
        `textsearch/json?query=` +
        query.join("+") +
        `&location=${lat},${lng}&radius=${params.get("range") * 1000}&key=${
          process.env.REACT_APP_GOOGLE_PLACES_API_KEY
        }`;

      if (query.length > 0) {
        apiRequest(url).then(
          (response) => {
            props.onSearch(response.results);
            props.onFetch(false);
          },
          (reject) => console.log(reject)
        );
      }
    });
  };

  history.listen(() => {
    let params = new URLSearchParams(history.location.search);
    setAddress(params.get("location"));
    setLocation(params.get("location"));
  });

  useEffect(() => {
    let isMounted = true;
    if (address && isMounted) {
      let params = new URLSearchParams(history.location.search);
      props.onSliderValueChange(Number(params.get("range")));

      geocodeByAddress(address)
        .then((results) => getLatLng(results[0]))
        .then((latLng) => {
          props.onFetch(true);
          props.onMapCenterChange([latLng.lat, latLng.lng]);
          fetchCategories(latLng.lat, latLng.lng);
        })
        .catch((error) => console.error("Error", error));
    }

    return () => {
      isMounted = false;
    };
    //eslint-disable-next-line
  }, [location, currentUrl]);

  const name = [
    "Culture",
    "Entertainment",
    "Food/Drink",
    "Hiking",
    "Sightseeing",
    "Sport",
  ];

  return (
    <div className="search-bar">
      <div className="search-bar__container">
        <AutocompleteSearch
          handleSearchClick={handleLocationClick}
          handleLocationChange={handleLocationChange}
          rangeValue={props.radius}
          handleSliderInputChange={handleSliderInputChange}
          handleSliderValueChange={props.onSliderValueChange}
          address={address}
          showSearch={showSearch}
          onSelect={handleLocationSelect}
        />

        <Activities
          handleActivityFocus={handleActivityFocus}
          handleActivityClick={handleActivityClick}
          handleCheckBoxChange={handleCheckBoxChange}
          handleOptionChange={handleOptionChange}
          handleArrowClick={handleArrowClick}
          selected={selected}
          selectedActivity={selectedActivity}
          showActivities={showActivities}
          name={name}
          checked={checked}
          selectedCategories={`${displayCategories()}`}
        />

        <button
          className="search-bar__display button"
          onClick={() => {
            handleClick();
          }}
        >
          Search
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
