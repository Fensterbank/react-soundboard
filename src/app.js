import React from "react";
import ReactDOM from "react-dom";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";

import Reducer from "./reducer";
import { Soundboard } from "./components/soundboard";

const store = createStore(
  Reducer,
  applyMiddleware(thunk)
);

store.subscribe(() => {
  let state = store.getState();
  document.body.style.backgroundColor = state.config.colors.background;
  document.body.style.color = state.config.colors.text;
});

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Provider store={store}>
      <Soundboard />
    </Provider>,
    document.getElementById("app")
  );
});
