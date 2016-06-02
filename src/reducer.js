const INITIAL_STATE = {
  fetching: true,
  config: {}
};

export default function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case "FETCHED_CONFIG":
      return Object.assign({}, state, {
        fetching: false,
        config: action.config
      });
  }
  return state;
}
