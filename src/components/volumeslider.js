import React from "react";
import { connect } from "react-redux";

import * as actionCreators from "../action_creators";
import { useMount } from "react-use";

const StandaloneVolumeslider = ({ volume, setVolume, loadVolume }) => {
  useMount(() => loadVolume());
  const sliderChange = (event) => setVolume(event.target.value);

  return (
    <div className="volumeslider">
      <input
        type="range"
        name="volume"
        max="100"
        min="0"
        onChange={sliderChange}
        value={volume}
      />
    </div>
  );
}

export const Volumeslider = connect(
  (state) => {
    return { volume: state.volume };
  },
  actionCreators
)(StandaloneVolumeslider);
