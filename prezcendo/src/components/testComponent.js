import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';

import { responseToArrayBuffer, getObjectFromArray } from '../helpers/midiHelper';

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

        // Create a revision
        this.props.dispatch(actions.createRevision(0, 0)); // Create a dummy revision

        // Load a MIDI file into the revision to simulate a slow connection
        this.props.dispatch(actions.loadArrayBuffer(0, 0,
            fetch("http://localhost:3000/test.mid")
            .then(responseToArrayBuffer)));

    }

    render() {
        return (
            <div>
                HELLO WORLD!
            </div>
        );
    }
}

TestComponent.propTypes = {
    dispatch: PropTypes.func,
    revisions: PropTypes.array
};

export default connect(mapStateToProps)(TestComponent);
