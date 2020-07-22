import PropTypes from "prop-types";
import "../../css/VersionB.css";
import { connect } from "react-redux";
import React, { Component } from "react";

import { Modal, ModalHeader, ModalBody } from "reactstrap";
import { FlexRow, FlexCol, Typography, TooltipButton, SlidersDisplay } from "./common";
import actions from "../../store/actions";

import MusicBox from './musicBox';

function mapStateToProps(state, ownProps) {
  const modal = state.interfaceSettings.modal;
  const bridgeInfo = state.bridges[state.interfaceSettings.modal.selectedBridge];

  return {
    ...ownProps,
    revisionID: modal.selectedRevision,
    childID: modal.selectedChild,
    isLastRevision: modal.selectedRevision == ( bridgeInfo.revisions.length -1 ),
    parameters: bridgeInfo.revisions[modal.selectedRevision].parameters,
    transitionInfo: bridgeInfo.revisions[modal.selectedRevision].offspring[modal.selectedChild],
  };
}

class InfoPanel extends Component {
  constructor(props) {
      super(props);

      this.state= {
        newParam: this.props.parameters,
        editorOpen: false,
      };
  }

  closeEditor = () => this.setState({editorOpen: false, newParam: this.props.parameters});

  createRevision = () => {
    this.props.dispatch(actions.createRevision(0, this.props.revisionID, this.props.childID, this.state.newParam)); // Create a dummy revision
    this.setState({editorOpen: false});
  }

  changeSlider( parameter, value ) {
    var newParam = { ...this.state.newParam };
    newParam[parameter] = value;
    this.setState({ newParam: newParam });
  }

  setBridge = () => this.props.dispatch(actions.setCurrentBridge( this.props.revisionID, this.props.childID ));

  render() {
    const transitionInfo = this.props.transitionInfo;
    if ( transitionInfo == null ) {
      return(null);
    }

    const name = transitionInfo.name ? transitionInfo.name : ("Generation " + (this.props.revisionID + 1) + " Child " + (this.props.childID + 1));

    return(
      <FlexCol className="VersionB Generate">
        <MusicBox bridge={0} rev={0} />
        <Typography>NAME: {name} </Typography>
        <Typography> GENERATION: {this.props.revisionID + 1} </Typography>
        <SlidersDisplay parameters={this.props.parameters} />

        <TooltipButton buttonText="DELETE GENERATION AND ALL DESCENDENTS" />
        <TooltipButton 
          buttonText="SET AS BRIDGE" 
          tooltipText="Use this transition in song"
          onClick={this.setBridge}
        />
        { this.props.isLastRevision && 
          <TooltipButton 
            buttonText="CREATE NEW GENERATION" 
            tooltipText="Generate children using this bridge as a parent" 
            onClick={() => this.setState({ editorOpen: true})} 
          />
        }

        <Modal isOpen={this.state.editorOpen} toggle={this.closeEditor} >
          <ModalHeader toggle={this.closeEditor}>
            NEW GENERATION
          </ModalHeader>
          <ModalBody>
            <Typography> Parent: </Typography>
            <MusicBox bridge={0} rev={0} style={{ width: "30%"}}/>
            <SlidersDisplay 
              parameters={this.state.newParam}
              changeSlider={(parameter, value) => this.changeSlider(parameter, value)}
            />
            <FlexRow>
              <TooltipButton 
                buttonText="Reset to Parent" 
                tooltipText="Change parameters to parent's parameters"
                onClick={ () => this.setState({newParam: this.props.parameters}) }
              />
              <TooltipButton 
                buttonText="GENERATE" 
                tooltipText="Create new generation with this parent"
                onClick={this.createRevision}
              />
            </FlexRow>
          </ModalBody>
        </Modal>  
      </FlexCol>
    );
  }
}

InfoPanel.propTypes = {
  transitionInfo: PropTypes.object,
  dispatch: PropTypes.func,
  revisionID: PropTypes.number,
  childID: PropTypes.number,
  isLastRevision: PropTypes.bool,
  parameters: PropTypes.object,
};

export default connect(mapStateToProps)(InfoPanel);
