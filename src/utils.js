export function apiRequest(query) {
  const url = `https://maps.googleapis.com/maps/api/place/${query}`;
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";

  return fetch(proxyUrl + url).then(
    (response) => {
      if (response.ok) {
        return response.json();
      } else {
        console.log("Error", response, query);
        return response.text().then((text) => Promise.reject(text));
      }
    },
    (fail) => console.log(fail)
  );
}
