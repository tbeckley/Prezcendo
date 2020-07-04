import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { getObjectFromArray,
            playMusic, stopMusic, } from '../helpers/midiHelper';

function mapStateToProps(state, ownProps) {
    return {
        revDetails: state.bridges[ownProps.bridge].revisions[ownProps.rev],
    };
}


class MusicBox extends Component {
    constructor(props) {
        super(props);
    }

    dummy() {
        playMusic();
        stopMusic();
    }

    title = () => ``

    render() {
        return (
            <div>
                {JSON.stringify(this.props)}
                {JSON.stringify(this.props.revDetails.MIDI && getObjectFromArray(this.props.revDetails.MIDI))}
                <div>
                    {this.props.bridge} - {this.props.rev}
                </div>
            </div>
        );
    }
}

MusicBox.propTypes = {
    revDetails: PropTypes.Object,
    bridge: PropTypes.Number,
    rev: PropTypes.Number

};

export default connect(mapStateToProps)(MusicBox);
