import React, { Component } from "react";
import { connect } from "react-redux";

import * as actionCreators from "../action_creators";

export class StandaloneButton extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      playing: false
    }
  }

  render() {
    let src = `assets/sounds/${this.props.file}`;

    return (
      <div
        className="button"
        style={this.getButtonStyles()}
        onClick={this.buttonClick}
      >
        <div className="tooltip">{this.props.title}</div>
        <div
          className="state"
          style={this.getStateStyles()}
        ></div>
        <audio
          src={src}
          preload="auto"
          ref={(tag) => { this._audioTag = tag; }}
          onEnded={() => { this.setState({playing: false}); }}
          onPause={() => { this.setState({playing: false}); }}
          onPlaying={() => { this.setState({playing: true}); }}
        ></audio>
      </div>
    );
  }

  buttonClick = () => {
    if (this.state.playing) {
      this._audioTag.pause();
    } else {
      this._audioTag.currentTime = 0.0;
      this._audioTag.volume = this.props.volume / 100;
      this._audioTag.play();
    }
  }

  getButtonStyles = () => {
    return {
      "backgroundColor": this.props.button_color
    };
  }

  getStateStyles = () => {
    return {
      "backgroundColor": this.state.playing ? this.props.playing_color : ""
    };
  }
}

export const Button = connect(
  (state) => {
    return {volume: state.volume};
  },
  actionCreators
)(StandaloneButton);
