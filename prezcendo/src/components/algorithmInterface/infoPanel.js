import PropTypes from "prop-types";
import "../../css/VersionB.css";
import { connect } from "react-redux";
import React, { Component } from "react";

import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { Container, ProgressBar, Tooltip, OverlayTrigger } from "react-bootstrap";
import { FlexRow, FlexCol, Typography, TooltipButton } from "./common";
import actions from "../../store/actions";
import {
  Row,
  Col,
  Button,
} from "reactstrap";

import MusicBox from './musicBox';
import { TRANSITION_PARAMETERS } from "../../constants";

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    bridgeInfo: state.bridges[state.interfaceSettings.modal.selectedBridge],
    revisionID: state.interfaceSettings.modal.selectedRevision,
    isFirstRevision: state.interfaceSettings.modal.selectedRevision == 0,
    isLastRevision: state.interfaceSettings.modal.selectedRevision == state.bridges[state.interfaceSettings.modal.selectedBridge].revisions.length -1,
  };
}

class InfoPanel extends Component {
  constructor(props) {
      super(props);

      this.state= {
        parameters: {
          happySad: 50,
          simpleComplex: 50,
          duration: 5,
        },
        tooltipOpen: false,
        editorOpen: false,
      };
  }

  closeEditor = () => this.setState({editorOpen: false});

  createRevision = () => {
    this.props.dispatch(actions.createRevision(0)); // Create a dummy revision
  }

  changeSlider( parameter, value ) {
    var newParam = this.state.parameters;
    newParam[parameter].value = value;
    this.setState({ parameters: newParam });
  }

  render() {
    return(
      <FlexCol className="VersionB Generate">
        <Typography> PLAYBAR </Typography>
        <Typography> GEN: {this.props.revisionID} </Typography>
        <Typography>GENERATED WITH </Typography>
        { !this.props.isFirstRevision && 
          <Row>
            { Object.keys(this.state.parameters).map( ( parameter ) => [
              <Col md={3} key={0} style={{textAlign: "right"}}>
                <Typography>{ TRANSITION_PARAMETERS[parameter].names[0] }</Typography>
              </Col>,
              <Col md={6} key={1} style={{textAlign: "center"}}>
                <ProgressBar
                  now={ this.state.parameters[parameter] / TRANSITION_PARAMETERS[parameter].max * 100}
                />
                <Typography key={2} >{ this.state.parameters[parameter] }</Typography>
              </Col>,
              <Col md={3} key={3} style={{textAlign: "left"}}>
                  <Typography>{ TRANSITION_PARAMETERS[parameter].names[1] }</Typography>
              </Col>
            ] ) }
          </Row>
        }

        <TooltipButton buttonText="REMOVE CURRENT BRIDGE" />
        <TooltipButton buttonText="DELETE GENERATION AND ALL DESCENDENTS" />
        <TooltipButton buttonText="SET AS BRIDGE" />
        { this.props.isLastRevision && 
          <TooltipButton buttonText="CREATE NEW GENERATION" tooltipText="Generate children using this bridge as a parent" />
        }
        
        <Modal isOpen={this.state.editorOpen} toggle={this.closeEditor} >
          <ModalHeader toggle={this.closeEditor}>
            NEW GENERATION
          </ModalHeader>
          <ModalBody>
            SECOND MODAL
          </ModalBody>
        </Modal>  
      </FlexCol>
    );
  }
}

InfoPanel.propTypes = {
  bridgeInfo: PropTypes.object,
  dispatch: PropTypes.func,
  revisionID: PropTypes.number,
  isFirstRevision: PropTypes.bool,
  isLastRevision: PropTypes.bool,
};

export default connect(mapStateToProps)(InfoPanel);
