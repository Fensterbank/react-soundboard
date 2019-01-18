import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../action_creators";

export class StandaloneVolumeslider extends Component {
  constructor(props) {
    super(props);

    this.state = {
      volume: this.props.volume
    };
  }

  componentDidMount() {
    this.props.loadVolume();
  }

  render() {
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
  }

  sliderChange = (event) => {
    let volume = event.target.value;

    this.setState({volume: volume});
    this.props.setVolume(volume);
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({volume: nextProps.volume});
  }
}

export const Volumeslider = connect(
  (state) => {
    return {volume: state.volume};
  },
  actionCreators
)(StandaloneVolumeslider);
