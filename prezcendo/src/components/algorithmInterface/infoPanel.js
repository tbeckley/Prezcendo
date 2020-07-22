import PropTypes from "prop-types";
import "../../css/VersionB.css";
import { connect } from "react-redux";
import React, { Component } from "react";

import { FlexCol, Typography, TooltipButton, SlidersDisplay } from "./common";
import actions from "../../store/actions";

import MusicBox from './musicBox';

function mapStateToProps(state, ownProps) {
  const modal = state.interfaceSettings.modal;
  const bridgeInfo = state.bridges[modal.selectedBridge];

  return {
    ...ownProps,
    bridgeID: modal.selectedBridge,
    revisionID: modal.selectedRevision,
    transitionInfo: bridgeInfo.revisions[modal.selectedRevision],
    revisionLength: bridgeInfo.revisions.length,
  };
}

class InfoPanel extends Component {

  setBridge = () => this.props.dispatch(actions.setCurrentBridge( this.props.revisionID ));

  render() {
    const transitionInfo = this.props.transitionInfo;

    return(
      transitionInfo == null || this.props.revisionLength == 0
      ? <FlexCol className="VersionB Generate">
        <Typography> NO TRANSITIONS HAVE BEEN CREATED YET </Typography>
        <TooltipButton 
            buttonText="CREATE NEW TRANSITION" 
            onClick={() => this.props.dispatch( actions.setNewTransModalOpen(true))} 
        />
      </FlexCol>

      : <FlexCol className="VersionB Generate">
        <MusicBox bridge={this.props.bridgeID} rev={this.props.revisionID} />
        <Typography>NAME: { transitionInfo.name ? transitionInfo.name : ("Transition " + (this.props.revisionID + 1)) } </Typography>
        <SlidersDisplay parameters={transitionInfo.parameters} />

        <TooltipButton buttonText="DELETE" />
        <TooltipButton 
          buttonText="SET AS TRANSITION" 
          tooltipText="Use this transition in song"
          onClick={this.setBridge}
        />
      </FlexCol>
    );
  }
}

InfoPanel.propTypes = {
  transitionInfo: PropTypes.object,
  dispatch: PropTypes.func,
  bridgeID: PropTypes.number,
  revisionID: PropTypes.number,
  revisionLength: PropTypes.number,
};

export default connect(mapStateToProps)(InfoPanel);
