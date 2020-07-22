import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import actions from "../../store/actions";

import { DEFAULT_PARAMETERS } from "../../store/defaultState";
import { Modal, ModalHeader, ModalBody } from "reactstrap";

import ToolBar from "./toolBar";
import TreePanel from "./treePanel";
import InfoPanel from "./infoPanel";
import NewTransitionModal from './newTransitionModal';

function mapStateToProps(state) {
    const modal = state.interfaceSettings.modal;
    return {
        selectedBridge: state.interfaceSettings.modal.selectedBridge,
        isOpen: modal.transModalOpen,
    }; 
}
  
class TransitionModal extends React.Component {
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
        this.props.dispatch(actions.setTransModalOpen(false));
    }

    changeSlider( parameter, value ) {
        var newParam = this.state.newParam;
        newParam[parameter] = value;
        this.setState({ newParam: newParam });
    }

    render() {
        return(
            <Modal
                isOpen={this.props.isOpen}
                toggle={this.closeEditor}
                scrollable
                >
                <ModalHeader toggle={this.closeEditor}>
                    GENERATE A TRANSITION
                </ModalHeader>
                <ModalBody>
                    <ToolBar style={{ height: "10%" }} />
                    <div
                    style={{ display: "flex", flexDirection: "row", height: "90%" }}
                    >
                    <TreePanel
                        bridgeID={this.state.bridgeID}
                        style={{ overflow: "auto", height: "100%" }}
                    />
                    <InfoPanel onExit={this.closeEditor} />
                    </div>
                </ModalBody>
                <NewTransitionModal />
            </Modal>
        );
    }
}

TransitionModal.propTypes = {
    dispatch: PropTypes.func,
    selectedBridge: PropTypes.number,
    isOpen: PropTypes.bool,
};

export default connect(mapStateToProps)(TransitionModal);
