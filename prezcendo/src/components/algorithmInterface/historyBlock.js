import React, { Component } from 'react';

import { connect } from "react-redux";

import { Button, Container, Row, Col } from 'react-bootstrap';

import PropTypes from 'prop-types';

import actions from '../../store/actions';

function mapStateToProps(state, ownProps) {
    return {
        selected: (ownProps.revisionID == state.interfaceSettings.modal.selectedRevision)
    };
}

class HistoryBlock extends Component {
    constructor(props) {
        super(props);
    }


    select = () => {
        this.props.dispatch(
            actions.setSelectedRevision(
                this.props.revisionID));
    }

    render() {
        return (
            <div className="VersionB Playback-Button" onClick={this.select}>
                REVISION {this.props.revisionID} {this.props.selected ? '*' : ''}
                <i className="fas fa-star" />
                <Button color={"primary"} style={{ width: "140px", height: "70px"}}>
                <i className="fa fa-play" />
                </Button>
            </div>
        );
    }
}

HistoryBlock.propTypes = {
    style: PropTypes.object,
    revisionID: PropTypes.number,
    selected: PropTypes.bool,
    dispatch: PropTypes.func
};

export default connect(mapStateToProps)(HistoryBlock);
