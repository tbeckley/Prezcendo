import PropTypes from "prop-types";
import "../../css/VersionB.css";
import { connect } from "react-redux";
import React, { Component } from "react";

import { Tooltip, Modal, ModalHeader, ModalBody } from "reactstrap";
import { Container, ProgressBar } from "react-bootstrap";
import { FlexRow, FlexCol, Typography } from "./common";
import actions from "../../store/actions";
import {
  Row,
  Col,
  Button,
} from "reactstrap";

import MusicBox from './musicBox';

function mapStateToProps(state, ownProps) {
  return {
    ...ownProps,
    bridgeInfo: state.bridges[state.interfaceSettings.modal.selectedBridge]
  };
}

class InfoPanel extends Component {
  constructor(props) {
      super(props);

      this.state= {
        parameters: {
          happySad:{
            names: [ "Happy", "Sad" ],
            min: 0,
            max: 100,
            value: 50,
          },
          simpleComplex:{
            names: [ "Simple", "Complex" ],
            min: 0,
            max: 100,
            value: 50,
          },
          duration:{
            names: [ "Duration", "(seconds)" ],
            min: 0,
            max: 10,
            value: 5,
          },
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
    const param = this.state.parameters;
    return(
      <FlexCol className="VersionB Generate">
          <Typography> PLAYBAR </Typography>
          <Typography> GEN: 2 </Typography>
          <Typography> PARAMETERS </Typography>
          <Row>
            { Object.keys(param).map( ( parameter, i ) => [
              <Col md={3} key={i} style={{textAlign: "right"}}>
                <Typography>{ param[parameter].names[0] }</Typography>
              </Col>,
              <Col md={6} key={i} style={{textAlign: "center"}}>
                <ProgressBar
                  now={ param[parameter].value / param[parameter].max * 100}
                />
                <Typography key={i} >{ param[parameter].value }</Typography>
              </Col>,
              <Col md={3} key={i} style={{textAlign: "left"}}>
                  <Typography>{ param[parameter].names[1] }</Typography>
              </Col>
            ] ) }
          </Row>
          <Button color={"primary"} id="TooltipHistory">
            SET AS BRIDGE
          </Button>
          <Tooltip placement="bottom" isOpen={this.state.tooltipOpen} target="TooltipHistory" toggle={ () => this.setState({ tooltipOpen: !this.state.tooltipOpen })}>
            Currently not available
          </Tooltip>
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
};

export default connect(mapStateToProps)(InfoPanel);
