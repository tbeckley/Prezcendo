import React, { Component } from 'react';

import { connect } from "react-redux";

import { Container, Row, Col } from 'react-bootstrap';

import PropTypes from 'prop-types';

import actions from '../../store/actions';

function mapStateToProps(state, ownProps) {
    return {
        selected: (ownProps.revID == state.interfaceSettings.modal.selectedRevision)
    };
}

class HistoryBlock extends Component {
    constructor(props) {
        super(props);
    }


    select = () => {
        this.props.dispatch(
            actions.setSelectedRevision(
                this.props.revID));
    }

    render() {
        return (
            <Container fluid style={{ ...style, ...this.props.style}} onClick={this.select}>
                <Row>
                    <Col>
                        REVISION {this.props.revID} {this.props.selected ? '*' : ''}
                    </Col>
                </Row>
            </Container>
        );
    }
}

const style={
    width: 150,
    height: 45,
    border: 'solid'
};

HistoryBlock.propTypes = {
    style: PropTypes.object,
    revID: PropTypes.number,
    selected: PropTypes.bool,
    dispatch: PropTypes.func
};

export default connect(mapStateToProps)(HistoryBlock);
