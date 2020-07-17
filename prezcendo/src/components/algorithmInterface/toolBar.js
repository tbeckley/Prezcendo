import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

import { FlexRow, TooltipButton } from "./common";

import MusicBox from './musicBox';

function mapStateToProps(state) {  
    return {
        selectedBridge: state.interfaceSettings.modal.selectedBridge,
        currentBridge: state.bridges[state.interfaceSettings.modal.selectedBridge].currentBridge,
    }; 
}
  
class ToolBar extends React.Component {
    render() {
        return(
            <FlexRow style={{ margin: 0 }}>
                Current Bridge:
                <MusicBox 
                    bridgeID={ this.props.selectedBridge } 
                    revID={ this.props.currentBridge.revisionID }
                    childID={ this.props.currentBridge.childID }
                    minimal={true} 
                />
                <TooltipButton buttonText="View in tree" />
                <TooltipButton buttonText="Remove current bridge" />
            </FlexRow>
        );
    }
}

ToolBar.propTypes = {
    dispatch: PropTypes.func,
    selectedBridge: PropTypes.number,
    currentBridge: PropTypes.object,
};

export default connect(mapStateToProps)(ToolBar);
