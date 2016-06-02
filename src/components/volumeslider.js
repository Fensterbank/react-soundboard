import React from "react";
import {connect} from "react-redux";

import * as actionCreators from "../action_creators";

export const StandaloneVolumeslider = React.createClass({
  componentDidMount: function() {
    this.props.loadVolume();
  },

  getInitialState: function() {
    return {volume: this.props.volume};
  },

  render: function() {
    return (
      <div id="volumeslider">
        <input
          type="range"
          name="volume"
          max="100"
          min="0"
          onChange={this.sliderChange}
          value={this.state.volume}
        />
      </div>
    );
  },

  sliderChange: function(event) {
    let volume = event.target.value;

    this.setState({volume: volume});
    this.props.setVolume(volume);
  },

  componentWillReceiveProps: function(nextProps) {
    this.setState({volume: nextProps.volume});
  }
});

export const Volumeslider = connect(
  (state) => {
    return {volume: state.volume};
  },
  actionCreators
)(StandaloneVolumeslider);
