import React, { Component } from "react";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";

import { responseToArrayBuffer, getObjectFromArray,
            playMusic, stopMusic } from '../helpers/midiHelper';

import MusicBox from './algorithmInterface/musicBox';

import actions from "../store/actions";

function mapStateToProps(state, ownProps) {
  return {
    revisions: state.bridges[0].revisions,
    ...ownProps,
  };
}

class TestComponent extends Component {
    constructor(props) {
        super(props);

        this.createRevision();
    }

    break = () => {
        this.props.dispatch(actions.testAction("BREAK"));
    }

    createRevision = () => {
        if(this.props.revisions.length == 0) {
            // Create a revision
            this.props.dispatch(actions.createRevision(0, 0)); // Create a dummy revision
        }
    }

    loadMidi = () => {
        // Load a MIDI file into the revision to simulate a slow connection
        this.props.dispatch(actions.loadArrayBuffer(0, 0,
            fetch("http://localhost:3000/test.mid")
                .then(responseToArrayBuffer)));
    }

    loadMidi2 = () => {
        // Load a MIDI file into the revision to simulate a slow connection
        this.props.dispatch(actions.loadArrayBuffer(0, 0,
            fetch("http://localhost:3000/teddybear.mid")
                .then(responseToArrayBuffer)));
    }

    playMusic = () => {
        const revs = this.props.revisions;
        playMusic(getObjectFromArray(revs[revs.length-1].MIDI));
    }

    stopMusic = () => {
        stopMusic();
    }

    render() {
        return (
            <div>
                <button onClick={this.loadMidi}>LOAD 1</button>
                <button onClick={this.loadMidi2}>LOAD 2</button> <br />
                <MusicBox style={{width: '20%' }} bridge={0} rev={0} />
            </div>
        );
    }
}

TestComponent.propTypes = {
  dispatch: PropTypes.func,
  revisions: PropTypes.array,
};

export default connect(mapStateToProps)(TestComponent);
