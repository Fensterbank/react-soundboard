const INITIAL_STATE = {
  fetching: true,
  config: {},
  volume: 50
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "FETCHED_CONFIG":
      return Object.assign({}, state, {
        fetching: false,
        config: action.config
      });
    case "CHANGED_VOLUME":
      return Object.assign({}, state, {
        volume: action.volume
      });
  }
  return state;
}
