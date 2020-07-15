import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../css/App.css";

import { Tooltip, Modal, ModalBody } from "reactstrap";
import EditingPage from "./algorithmInterface/editingPage";
import { ToolBar } from "./algorithmInterface/toolBar";

export class HeaderComponent extends React.Component {
  render() {
    return (
      <header className="App-header">
        <img
          src={require("../assets/prezcendo_menu.PNG")}
          style={{ height: "32px" }}
          alt="menu"
        />
        <img
          src={require("../assets/prezcendo_title.PNG")}
          style={{ height: "31px" }}
          alt="title"
        />
        <img
          src={require("../assets/prezcendo_collab.PNG")}
          style={{ height: "36px" }}
          alt="collab"
        />
      </header>
    );
  }
}

function mapStateToProps(state) {
  return {
    transitionEmpty: state.bridges[0].revisions.length == 0,
  };
}

class ContainerComponent extends React.Component {
  constructor(props) {
      super(props);

      this.state={
        transitionEditorOpen: false,
        transitionTipOpen: false,
      };
  }

  toggleTip = () => this.setState({ transitionTipOpen: !this.state.transitionTipOpen});

  closeEditor = () => this.setState({transitionEditorOpen: false});

  render() {
    return (
      <div className="App-container">
        <div style={{ position: "relative" }}>
          <img
            src={require("../assets/prezcendo_blocks.PNG")}
            style={{ height: "auto", width: "100%" }}
            alt="blocks"
          />
          <button className="App-transition-button left" />
          <button className="App-transition-button middle" />
          <button
            className={ this.props.transitionEmpty ? "App-transition-button right empty" : "App-transition-button right"}
            onClick={() => this.setState({transitionEditorOpen: true})}
            id="TooltipBridge"
          />
          <Tooltip placement="bottom" isOpen={this.state.transitionTipOpen} target="TooltipBridge" toggle={this.toggleTip}>
            Add a transition
          </Tooltip>
        </div>
        <Modal isOpen={this.state.transitionEditorOpen} toggle={this.closeEditor} >
         <ToolBar toggle={this.closeEditor} /> 
          <ModalBody>
            <EditingPage onExit={this.closeEditor} />
          </ModalBody>
        </Modal>
      </div>
    );
  }
}

ContainerComponent.propTypes = {
  transitionEmpty: PropTypes.object,
};

export default connect(mapStateToProps)(ContainerComponent);
