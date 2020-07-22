import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import actions from '../../store/actions';
import { responseToArrayBuffer } from '../../helpers/midiHelper';
import { getBaseURL } from '../../helpers/webHelper';

import { FlexCol } from "./common";

import HistoryBlock from './historyBlock';

function mapStateToProps(state) {
    return {
        bridgeInfo: state.bridges[state.interfaceSettings.modal.selectedBridge],
    };
}

class TreePanel extends Component {

    componentDidMount = () => this.loadMidis();

    // THESE ARE TEST FUNCITONS
    createRevision = () => this.props.dispatch(actions.createRevision(0)); // Create a dummy revision

    loadMidis = () => {
        const MIDIURL = getBaseURL();

        // Load a MIDI file into the revision to simulate a slow connection
        this.props.dispatch(actions.handleMIDI(0, 0,
            fetch(`${MIDIURL}/first.mid`)
                .then(responseToArrayBuffer)));

        // Delay to avoid race condition that seemingly crops up
        setTimeout(() =>
            this.props.dispatch(actions.handleMIDI(0, 1,
                fetch(`${MIDIURL}/last.mid`)
                    .then(responseToArrayBuffer))), 1000);
    }

    getBlock = (rev, i) => <HistoryBlock
        key={i} revisionID={i} bridgeID={this.props.bridgeID} style={{
    }} />;

    render() {
        const revisions = this.props.bridgeInfo.revisions;

        return (
            <FlexCol style={{ overflow: "hidden", overflowY: "scroll", width: "50%"}}>
                { revisions.map(this.getBlock)}
            </FlexCol>
        );
    }
}

TreePanel.propTypes = {
    dispatch: PropTypes.func,
    bridgeInfo: PropTypes.object,
    bridgeID: PropTypes.number,
    revisionID: PropTypes.number,
};

export default connect(mapStateToProps)(TreePanel);
