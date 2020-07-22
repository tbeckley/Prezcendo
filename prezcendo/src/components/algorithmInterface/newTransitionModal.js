import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import actions from "../../store/actions";

import { DEFAULT_PARAMETERS } from "../../store/defaultState";
import { TooltipButton, SlidersDisplay } from "./common";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

function mapStateToProps(state) {
    const modal = state.interfaceSettings.modal;
    return {
        selectedBridge: state.interfaceSettings.modal.selectedBridge,
        isOpen: modal.newTransModalOpen,
    }; 
}
  
class NewTransitionModal extends React.Component {
    constructor(props) {
        super(props);
  
        this.state= {
          newParam: { ...DEFAULT_PARAMETERS},
        };
    }

    createRevision = () => { 
        this.props.dispatch(actions.createRevision(this.props.selectedBridge, this.state.newParam )); 
        this.closeEditor();
    }

    closeEditor = () => {
        this.props.dispatch(actions.setNewTransModalOpen(false));
        this.setState({newParam: { ...DEFAULT_PARAMETERS} });
    }

    changeSlider( parameter, value ) {
        var newParam = this.state.newParam;
        newParam[parameter] = value;
        this.setState({ newParam: newParam });
    }

    render() {
        return(
            <Modal isOpen={this.props.isOpen} toggle={this.closeEditor} >
                <ModalHeader toggle={this.closeEditor}>
                    NEW GENERATION
                </ModalHeader>
                <ModalBody>
                    <SlidersDisplay 
                        parameters={this.state.newParam}
                        changeSlider={(parameter, value) => this.changeSlider(parameter, value)}
                    />
                    <TooltipButton 
                        buttonText="GENERATE" 
                        tooltipText="Create new generation with this parent"
                        onClick={this.createRevision}
                    />
                </ModalBody>
            </Modal>
        );
    }
}

NewTransitionModal.propTypes = {
    dispatch: PropTypes.func,
    selectedBridge: PropTypes.number,
    isOpen: PropTypes.bool,
};

export default connect(mapStateToProps)(NewTransitionModal);
