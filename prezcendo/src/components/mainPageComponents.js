/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "../css/App.css";
import actions from "../store/actions";

import {
  Tooltip,
  Modal,
  ModalHeader,
  ModalBody,
  Input,
  Button,
} from "reactstrap";

import TransitionModal from './algorithmInterface/transitionModal';
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
    currentRevision: state.bridges[0].currentRevision,
    songSequences: state.blocks,
  };
}

class ContainerComponent extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      newBlockName: "",
      notesLayoutOpen: false,
      blockNamingModalOpen: false,
      transitionTipOpen: false,
      bridgeID: 0,
      activeSequenceID: null,
    };
  }

  AddBlockButton = () => (
    <div
      css={css`
        padding-right: 20px;
        margin-left: -1px;
        color: ${theme.colors.buttons.green.normal};
        cursor: pointer;
      `}
      onClick={() => {
        this.setState({ blockNamingModalOpen: true });
      }}
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

  toggleTip = () =>
    this.setState({ transitionTipOpen: !this.state.transitionTipOpen });

  openNotesLayout = (sequenceID) => {
    if (!this.state.notesLayoutOpen) {
      this.setState({ notesLayoutOpen: true });
      this.setState({ activeSequenceID: sequenceID });
    }
  };

  updateSequenceData = (newSequenceData) => {
    const targetSequenceIndex = this.props.songSequences.findIndex(
      (sequence) => sequence.id === newSequenceData.id
    );

    const old = this.props.songSequences;
    const newSequencesState = [
      ...old.slice(0, targetSequenceIndex),
      newSequenceData,
      ...old.slice(targetSequenceIndex + 1),
    ];
    this.setState({ songSequences: newSequencesState });
  };

  NamePrompt = () => {
    const isInputValid = this.state.newBlockName.length > 0;
    const submit = () => {
      if (isInputValid) {
        this.props.dispatch(actions.addBlock(this.state.newBlockName));
        this.setState({ newBlockName: "" });
        this.setState({ blockNamingModalOpen: false });
      }
    };
    return (
      <Modal
        autoFocus={false}
        size="sm"
        isOpen={this.state.blockNamingModalOpen}
        css={css`
          margin-top: 30%;
        `}
      >
        <ModalHeader>Give a name to your song&apos;s new block</ModalHeader>
        <ModalBody>
          <div
            css={css`
              display: flex;
              flex-direction: row;
              justify-content: center;
            `}
          >
            <Input
              onKeyDown={(e) => {
                if (e.key === "Enter") submit();
              }}
              maxLength={15}
              autoFocus
              onChange={(e) => {
                this.setState({ newBlockName: e.target.value });
              }}
              value={this.state.newBlockName}
              css={css`
                width: 75%;
              `}
              placeholder="New block name..."
            />

            <Button
              disabled={!isInputValid}
              color="primary"
              onClick={() => submit()}
            >
              Create
            </Button>
          </div>
        </ModalBody>
      </Modal>
    );
  };

  render() {
    const songSequences = this.props.songSequences;
    const notesLayoutOpen = this.state.notesLayoutOpen;

    const RenderedSongRequences = songSequences.map((sequence, index) => {
      const ACCEPTABLE_COLOURS = ["green", "pink", "blue", "purple"];
      const cycledColour =
        ACCEPTABLE_COLOURS[index % ACCEPTABLE_COLOURS.length];

      return (
        <React.Fragment key={sequence.id}>
          <div onClick={() => this.openNotesLayout(sequence.id)}>
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
              (this.props.currentRevision == null ? " empty" : "")
            }
            onClick={() => this.props.dispatch(actions.setTransModalOpen(true))}
            id="TooltipBridge"
          />
          <SongSection sectionName={"Ending"} color={"purple"} />
          {this.AddBlockButton()}
        </div>
        <Tooltip
          placement="bottom"
          isOpen={this.state.transitionTipOpen}
          target="TooltipBridge"
          toggle={this.toggleTip}
        >
          Add a transition
        </Tooltip>
        <TransitionModal />
        {this.NamePrompt()}
        <CSSTransition
          in={notesLayoutOpen}
          timeout={800}
          classNames="sliding-container"
          unmountOnExit
        >
          <NotesLayout
            sequenceID={this.state.activeSequenceID}
            onExit={() => this.setState({ notesLayoutOpen: false })}
          />
        </CSSTransition>
      </div>
    );
  }
}

ContainerComponent.propTypes = {
  currentRevision: PropTypes.number,
  songSequences: PropTypes.array,
  dispatch: PropTypes.func,
};

export default connect(mapStateToProps)(ContainerComponent);
