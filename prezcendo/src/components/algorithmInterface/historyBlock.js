import React, { Component } from 'react';

import { connect } from "react-redux";

import { Button, Container, Row, Col } from 'react-bootstrap';

import PropTypes from 'prop-types';

import actions from '../../store/actions';

function mapStateToProps(state, ownProps) {
    return {
        selected: (ownProps.revisionID == state.interfaceSettings.modal.selectedRevision) && (ownProps.childID == state.interfaceSettings.modal.selectedChild)
    };
}

class HistoryBlock extends Component {
    constructor(props) {
        super(props);
    }

    select = () => {
        this.props.dispatch(
            actions.setSelectedTransition(
                this.props.revisionID, this.props.childID));
    }

    render() {
        return (
            <div className="VersionB Playback-Button" onClick={this.select}>
                <i className={ this.props.selected ? "fas fa-star" : "far fa-star" } />
                <Button color={"primary"} style={{ width: "140px", height: "70px"}}>
                    GENERATION {this.props.revisionID + 1}
                </Button>
            </div>
        );
    }
}

HistoryBlock.propTypes = {
    style: PropTypes.object,
    revisionID: PropTypes.number,
    childID: PropTypes.number,
    selected: PropTypes.bool,
    dispatch: PropTypes.func
};

export default connect(mapStateToProps)(HistoryBlock);
