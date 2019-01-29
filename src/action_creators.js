export function loadConfig() {
  return (dispatch) => {
    fetch("/assets/config.json")
      .then((response) => response.json())
      .then((data) => {
        dispatch({
          type: "FETCHED_CONFIG",
          config: data
        });
      })
      .catch((e) => console.log('Error fetching config:', e));
  };
}

export function setVolume(volume) {
  localStorage.setItem("volume", volume);

  return {
    type: "CHANGED_VOLUME",
    volume: volume
  };
}

export function loadVolume() {
  return {
    type: "CHANGED_VOLUME",
    volume: localStorage.getItem("volume") || 50
  };
}
