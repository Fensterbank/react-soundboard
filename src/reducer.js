const INITIAL_STATE = {
  fetching: true,
  config: {},
  volume: 50
};

export default function (state = INITIAL_STATE, action) {
  switch (action.type) {
    default:
      return state;
    case "FETCHED_CONFIG":      
      return {
        ...state,
        fetching: false,
        config: action.config
      };
    case "CHANGED_VOLUME":
      return {
        ...state,
        volume: action.volume
      };
  }
}
