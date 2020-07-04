import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { responseToArrayBuffer, getObjectFromArray,
            playMusic } from '../helpers/midiHelper';

import actions from '../store/actions';

function mapStateToProps(state, ownProps) {
    return {
        revisions: state.bridges[0].revisions,
        ...ownProps
    };
}


class TestComponent extends Component {
    constructor(props) {
        super(props);

        this.createRevision();
        this.loadMidi();
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
        console.log();
    }

    render() {
        return (
            <div>
                <button onClick={this.break}> BREAK</button>
                <button onClick={this.createRevision}> CREATE REIVSION </button> <br />

                <button onClick={this.loadMidi}>LOAD MIDI 1</button>
                <button onClick={this.loadMidi2}>LOAD MIDI 2</button><br />

                <button onClick={this.playMusic}> PLAY PHAT BATS</button>
                <button onClick={this.stopMusic}> STOP PHAT BATS</button>

                <br />{ this.props.revisions.length > 0 && JSON.stringify(getObjectFromArray(this.props.revisions[0].MIDI)) }
            </div>
        );
    }
}

TestComponent.propTypes = {
    dispatch: PropTypes.func,
    revisions: PropTypes.array
};

export default connect(mapStateToProps)(TestComponent);
