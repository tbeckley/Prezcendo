import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../css/App.css";
import { FlexRow } from "./algorithmInterface/common";

import { Tooltip, Modal, ModalHeader, ModalBody } from "reactstrap";
import ToolBar from "./algorithmInterface/toolBar";
import TreePanel from "./algorithmInterface/treePanel";
import InfoPanel from "./algorithmInterface/infoPanel";

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
        editorOpen: false,
        transitionTipOpen: false,
        bridgeID: 0,
      };
  }

  toggleTip = () => this.setState({ transitionTipOpen: !this.state.transitionTipOpen});

  closeEditor = () => this.setState({editorOpen: false});

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
            className={ "App-transition-button right" + (this.props.transitionEmpty ? " empty" : "") }
            onClick={() => this.setState({editorOpen: true})}
            id="TooltipBridge"
          />
          <Tooltip placement="bottom" isOpen={this.state.transitionTipOpen} target="TooltipBridge" toggle={this.toggleTip}>
            Add a transition
          </Tooltip>
        </div>
        <Modal isOpen={this.state.editorOpen} toggle={this.closeEditor} scrollable >
          <ModalHeader toggle={this.closeEditor}>
            GENERATE A TRANSITION
          </ModalHeader>
          <ModalBody>
            <ToolBar style={{height: "10%"}}/>
            <div style={{display: "flex", flexDirection: "row", height: "90%"}}>
              <TreePanel bridgeID={this.state.bridgeID} style={{ overflow: "auto", height: "100%" }}/>
              <InfoPanel onExit={this.closeEditor} />
            </div>
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
