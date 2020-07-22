import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import actions from "../../store/actions";

import { DEFAULT_PARAMETERS } from "../../store/defaultState";
import { FlexRow, Typography, TooltipButton, SlidersDisplay } from "./common";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

import MusicBox from './musicBox';

function mapStateToProps(state) {
    const modal = state.interfaceSettings.modal;
    const bridgeInfo = state.bridges[state.interfaceSettings.modal.selectedBridge];
    const parameters = modal.selectedRevision ? bridgeInfo.revisions[modal.selectedRevision].parameters : { ...DEFAULT_PARAMETERS };
    return {
        selectedBridge: state.interfaceSettings.modal.selectedBridge,
        currentBridge: state.bridges[state.interfaceSettings.modal.selectedBridge].currentBridge,
        parameters: parameters,
    }; 
}
  
class ToolBar extends React.Component {
    constructor(props) {
        super(props);
  
        this.state= {
          newParam: this.props.parameters,
          editorOpen: false,
        };
    }

    createRevision = () => this.props.dispatch(actions.createRevision(0, this.state.newParam ));

    closeEditor = () => this.setState({editorOpen: false, newParam: this.props.parameters});

    changeSlider( parameter, value ) {
        var newParam = { ...this.state.newParam };
        newParam[parameter] = value;
        this.setState({ newParam: newParam });
    }

    remove = () => { this.props.dispatch( actions.setSelectedTransition(null)); }

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
                    onClick={() => this.setState({ editorOpen: true})} 
                />

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
                            buttonText="GENERATE" 
                            tooltipText="Create new generation with this parent"
                            onClick={this.createRevision}
                        />
                        </FlexRow>
                    </ModalBody>
                </Modal>
            </FlexRow>
        );
    }
}

ToolBar.propTypes = {
    dispatch: PropTypes.func,
    selectedBridge: PropTypes.number,
    currentBridge: PropTypes.number,
    parameters: PropTypes.object,
};

export default connect(mapStateToProps)(ToolBar);
