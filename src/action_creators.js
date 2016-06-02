export function loadConfig() {
  return (dispatch) => {
    fetch("/assets/config.json").then((response) => {
      response.json().then((data) => {
        dispatch({
          type: "FETCHED_CONFIG",
          config: data
        });
      });
    });
  };
}
