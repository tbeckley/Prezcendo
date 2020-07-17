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
import NotesLayout from "./notesLayout/notesLayout";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlusSquare } from "@fortawesome/free-solid-svg-icons";
import { theme } from "../helpers/theme";
import { CSSTransition } from "react-transition-group";

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
      color: ${theme.colors.buttons.green.normal};
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
      notesLayoutOpen: false,
      editorOpen: false,
      transitionTipOpen: false,
      bridgeID: 0,
      activeSequenceID: null,
      songSequences: [
        {
          name: "Intro",
          id: 6969,
          bpm: 4,
          noteValue: 4,
          tracks: [],
        },
        {
          name: "Hook",
          id: 2020,
          bpm: 4,
          noteValue: 4,
          tracks: [],
        },
        {
          name: "bruh1",
          id: 2021,
          bpm: 4,
          noteValue: 4,
          tracks: [],
        },
        {
          name: "bruh2",
          id: 2022,
          bpm: 4,
          noteValue: 4,
          tracks: [],
        },
        {
          name: "bruh3",
          id: 2023,
          bpm: 4,
          noteValue: 4,
          tracks: [],
        },
      ],
    };
  }

  toggleTip = () =>
    this.setState({ transitionTipOpen: !this.state.transitionTipOpen });

  closeEditor = () => this.setState({ editorOpen: false });

  openNotesLayout = (sequenceID) => {
    if (!this.state.notesLayoutOpen) {
      this.setState({ notesLayoutOpen: true });
      this.setState({ activeSequenceID: sequenceID });
    }
  };

  updateSequenceData = (newSequenceData) => {
    const targetSequenceIndex = this.state.songSequences.findIndex(
      (sequence) => sequence.id === newSequenceData.id
    );

    const old = this.state.songSequences;
    const newSequencesState = [
      ...old.slice(0, targetSequenceIndex),
      newSequenceData,
      ...old.slice(targetSequenceIndex + 1),
    ];
    this.setState({ songSequences: newSequencesState });
  };

  render() {
    const songSequences = this.state.songSequences;
    const notesLayoutOpen = this.state.notesLayoutOpen;

    const RenderedSongRequences = songSequences.map((sequence, index) => {
      const ACCEPTABLE_COLOURS = ["green", "pink", "blue", "purple"];
      const cycledColour =
        ACCEPTABLE_COLOURS[index % ACCEPTABLE_COLOURS.length];

      return (
        <React.Fragment key={sequence.id}>
          <div onClick={(e) => this.openNotesLayout(sequence.id)}>
            <SongSection
              clickable={!this.state.notesLayoutOpen}
              key={sequence.id}
              sectionName={sequence.name}
              color={cycledColour}
              isFirst={index === 0}
            />
          </div>

          <button className="App-transition-button " />
        </React.Fragment>
      );
    });

    return (
      <div className="App-container">
        <div
          css={css`
            overflow-x: auto;
            margin: 0 20px;
            padding: 30px 20px;
            justify-content: flex-start;
            display: flex;
            align-items: center;
          `}
        >
          {RenderedSongRequences}
          {/* TODO: These are dummy sections to allow for the bridge generate button.
          I'm leaving them alone for now because idk what is going to happen with the bridges.
          The buttons needed to be created automatically similar to the other song sections.
          The tooltip and fill-state needs to be re-done in the rendered song sequences
          */}
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

        <CSSTransition
          in={notesLayoutOpen}
          timeout={800}
          classNames="sliding-container"
          unmountOnExit
        >
          <NotesLayout
            sequenceData={this.state.songSequences.find(
              (sequence) => sequence.id === this.state.activeSequenceID
            )}
            sequenceUpdater={this.updateSequenceData}
            onExit={() => this.setState({ notesLayoutOpen: false })}
          />
        </CSSTransition>
      </div>
    );
  }
}

ContainerComponent.propTypes = {
  transitionEmpty: PropTypes.object,
};

export default connect(mapStateToProps)(ContainerComponent);
