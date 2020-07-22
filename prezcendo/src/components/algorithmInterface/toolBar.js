import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import actions from "../../store/actions";

import { FlexRow, TooltipButton } from "./common";

import MusicBox from './musicBox';

function mapStateToProps(state) {
    return {
        selectedBridge: state.interfaceSettings.modal.selectedBridge,
        currentBridge: state.bridges[state.interfaceSettings.modal.selectedBridge].currentBridge,
    }; 
}
  
class ToolBar extends React.Component {

    remove = () => { this.props.dispatch( actions.setCurrentBridge(null)); }

    render() {
        return(
            <FlexRow style={{ margin: 0 }}>
                Current Transition:
                <MusicBox 
                    bridgeID={ this.props.selectedBridge } 
                    revID={ this.props.currentBridge }
                    minimal={true} 
                />
                <TooltipButton 
                    buttonText="REMOVE" 
                    tooltipText="Remove current transition" 
                    onClick={this.remove} 
                />
                <TooltipButton 
                    buttonText="NEW" 
                    tooltipText="Create new transition" 
                    onClick={() => this.props.dispatch( actions.setNewTransModalOpen(true))} 
                />
            </FlexRow>
        );
    }
}

ToolBar.propTypes = {
    dispatch: PropTypes.func,
    selectedBridge: PropTypes.number,
    currentBridge: PropTypes.number,
};

export default connect(mapStateToProps)(ToolBar);
