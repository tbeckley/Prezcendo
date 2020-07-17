import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import actions from '../../store/actions';
import { responseToArrayBuffer } from '../../helpers/midiHelper';
import { getBaseURL } from '../../helpers/webHelper';

import { FlexCol, FlexRow } from "./common";
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
        this.props.dispatch(actions.setSelectedTransition(0));
    }

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
        key={i} revisionID={i} childID={rev.successfulChild} bridgeID={this.props.bridgeID} style={{
    }} />;

    getBlockLastRev = (rev, i) => <HistoryBlock
        key={i} revisionID={ this.props.bridgeInfo.revisions.length -1 } childID={i} bridgeID={this.props.bridgeID} style={{
    }} />;

    render() {
        const length = this.props.bridgeInfo.revisions.length;
        const lastRev = this.props.bridgeInfo.revisions[length -1];
        if (this.props.bridgeInfo.revisions.length < 2 ) return(null);
        return (
            <FlexCol style={{ overflow: "auto", width: "50%"}}>
                { this.props.bridgeInfo.revisions.map((rev, i) => [ this.getBlock(rev,i), <MdArrowDownward key={i} size="50" /> ] )}
                <FlexRow>
                    { lastRev.offspring.map((offspring, i) => this.getBlockLastRev(offspring, i) )}
                </FlexRow>
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
