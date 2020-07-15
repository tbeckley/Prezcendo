import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import actions from '../../store/actions';
import { responseToArrayBuffer } from '../../helpers/midiHelper';
import { getBaseURL } from '../../helpers/webHelper';

import { FlexCol } from "./common";
import { MdArrowDownward } from 'react-icons/md';

import HistoryBlock from './historyBlock';

function mapStateToProps(state) {
    return {
        bridgeInfo: state.bridges[state.interfaceSettings.modal.selectedBridge],
    };
}

class TreePanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: null
        };

        this.createRevision(0); // Create two test revisions for the history bar
        this.createRevision(0); // The second test revision
        this.createRevision(0); // The second test revision
        this.createRevision(0); // The second test revision
        this.createRevision(0); // The second test revision
        this.createRevision(0); // The second test revision
        this.props.dispatch(actions.setSelectedRevision(0));
    }

    componentDidMount() {
        this.loadMidis();
    }

    // THESE ARE TEST FUNCITONS
    createRevision = () => {
            this.props.dispatch(actions.createRevision(0)); // Create a dummy revision
    }

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

    getBlock = (v, k) => <HistoryBlock
        key={k} revisionID={k} bridgeID={this.props.bridgeID} style={{
        }} />;

    render() {
        return (
            <FlexCol style={{ overflow: "auto", width: "50%"}}>
                { this.props.bridgeInfo.revisions.slice(0,1).map(this.getBlock)}
                {this.props.bridgeInfo.revisions.slice(1).map((v, k) => [ <MdArrowDownward key={k} size={50} />, this.getBlock(v,k+1) ] )}
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
