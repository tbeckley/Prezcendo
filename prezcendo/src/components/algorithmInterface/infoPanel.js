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
    revisionID: modal.selectedRevision,
    transitionInfo: bridgeInfo.revisions[modal.selectedRevision],
  };
}

class InfoPanel extends Component {

  setBridge = () => this.props.dispatch(actions.setCurrentBridge( this.props.revisionID ));

  render() {
    console.log(this.props);
    
    if ( this.props.revisionID == null ) {
      return(null);
    }

    const transitionInfo = this.props.transitionInfo;
    const name = transitionInfo.name ? transitionInfo.name : ("Transition " + (this.props.revisionID + 1));

    return(
      <FlexCol className="VersionB Generate">
        <MusicBox bridge={0} rev={0} />
        <Typography>NAME: {name} </Typography>
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
  revisionID: PropTypes.number,
};

export default connect(mapStateToProps)(InfoPanel);
