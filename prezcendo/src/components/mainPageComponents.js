/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../css/App.css";

import { Tooltip, Modal, ModalHeader, ModalBody } from "reactstrap";
import ToolBar from "./algorithmInterface/toolBar";
import TreePanel from "./algorithmInterface/treePanel";
import InfoPanel from "./algorithmInterface/infoPanel";

import SongSection from "./songSection/songSection";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { theme } from "../helpers/theme";

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
const AddBlockButton = () => (
  <div
    css={css`
      padding-right: 20px;
      margin-left: -1px;
      color: ${theme.colors.buttons.green};

      cursor: pointer;
    `}
  >
    <FontAwesomeIcon
      icon={faPlusSquare}
      size="3x"
      css={css`
        &:hover {
          box-shadow: ${theme.shadows.innerDim}, ${theme.shadows.light};
        }
      `}
    />
  </div>
);

class ContainerComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      editorOpen: false,
      transitionTipOpen: false,
      bridgeID: 0,
    };
  }

  toggleTip = () =>
    this.setState({ transitionTipOpen: !this.state.transitionTipOpen });

  closeEditor = () => this.setState({ editorOpen: false });

  render() {
    return (
      <div className="App-container">
        <div
          css={css`
            margin: 0 10px;
            justify-content: flex-start;
            display: flex;
            align-items: center;
          `}
        >
          <SongSection sectionName={"Intro"} color={"green"} isFirst={true} />
          <button className="App-transition-button " />
          <SongSection sectionName={"Hook"} color={"pink"} />
          <button className="App-transition-button" />
          <SongSection sectionName={"Chorus"} color={"blue"} />
          <button
            className={
              "App-transition-button" +
              (this.props.transitionEmpty ? " empty" : "")
            }
            onClick={() => this.setState({ editorOpen: true })}
            id="TooltipBridge"
          />
          <SongSection sectionName={"Ending"} color={"purple"} />
          <AddBlockButton />
        </div>

        <div>
          <Tooltip
            placement="bottom"
            isOpen={this.state.transitionTipOpen}
            target="TooltipBridge"
            toggle={this.toggleTip}
          >
            Add a transition
          </Tooltip>

          <Modal
            isOpen={this.state.editorOpen}
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
          </Modal>
        </div>
      </div>
    );
  }
}

ContainerComponent.propTypes = {
  transitionEmpty: PropTypes.object,
};

export default connect(mapStateToProps)(ContainerComponent);
