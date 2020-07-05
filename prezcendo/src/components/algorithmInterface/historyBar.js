import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from "react-redux";

import actions from '../../store/actions';
import { responseToArrayBuffer } from '../../helpers/midiHelper';

import { Container, Row, Col } from 'react-bootstrap';
import { MdArrowForward } from 'react-icons/md';

import HistoryBlock from './historyBlock';

function mapStateToProps(state) {
    return {
        bridgeInfo: state.bridges[state.interfaceSettings.modal.selectedBridge]
    };
}

class HistoryBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            selected: null
        };

        this.createRevision(0); // Create two test revisions for the history bar
        this.createRevision(0); // The second test revision

        this.loadMidis();
    }

    // THESE ARE TEST FUNCITONS
    createRevision = () => {
            this.props.dispatch(actions.createRevision(0)); // Create a dummy revision
    }

    loadMidis = () => {
        // Load a MIDI file into the revision to simulate a slow connection
        this.props.dispatch(actions.loadArrayBuffer(0, 0,
            fetch("http://localhost:3000/first.mid")
                .then(responseToArrayBuffer)));

        // Delay to avoid race condition that seemingly crops up
        setTimeout(() =>
            this.props.dispatch(actions.loadArrayBuffer(0, 1,
                fetch("http://localhost:3000/last.mid")
                    .then(responseToArrayBuffer))), 1000);
    }

    getBlock = (v, k) => <HistoryBlock
        key={k} revID={k} bridgeID={this.props.bridgeID} style={{
        }} />;

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col md={1}>

                    </Col>
                    <Col md={10} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                        {this.props.bridgeInfo.revisions.slice(0,1).map(this.getBlock)}

                        {this.props.bridgeInfo.revisions.slice(1).map((v, k) =>
                            [ <MdArrowForward key={k} size={50} />, this.getBlock(v,k+1) ] )}
                    </Col>
                    <Col md={1}>

                    </Col>
                </Row>

                </Container>
        );
    }
}

HistoryBar.propTypes = {
    dispatch: PropTypes.func,
    bridgeInfo: PropTypes.object,
    bridgeID: PropTypes.number
};

export default connect(mapStateToProps)(HistoryBar);
