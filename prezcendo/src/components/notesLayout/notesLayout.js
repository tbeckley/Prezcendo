/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { theme } from "./../../helpers/theme";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Typography } from "../algorithmInterface/common";
import { Row, Col, Button } from "react-bootstrap";
import styled from "@emotion/styled";
import { IdMaker } from "../../helpers/unitHelper";
import { GiPianoKeys } from "react-icons/gi";
import actions from "../../store/actions";
import TrackNotesGrid from "./trackNotesGrid";

import React, { Component } from "react"; //eslint-disable-line no-unused-vars

import * as R from "ramda";
import { connect } from "react-redux";

function mapStateToProps(state, ownProps) {
  return {
    sequenceData: R.filter((a) => a.id == ownProps.sequenceID, state.blocks)[0],
  };
}

class NotesLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  ExitButton = () => (
    <div
      onClick={this.props.onExit}
      css={css`
        color: ${theme.colors.buttons.yellow.normal};
        cursor: pointer;
      `}
    >
      <FontAwesomeIcon
        icon={faTimesCircle}
        size="3x"
        css={css`
          &:hover {
            color: ${theme.colors.buttons.yellow.dim};
          }
        `}
      />
    </div>
  );

  InstrumentTrack = styled.div`
    margin: 5px 0;
    color: white;
    width: 100%;
    min-height: 125px;
  `;

  InstrumentIcon = (instrumentName) => {
    let icon = null;
    switch (instrumentName) {
      case "PIANO":
        icon = <GiPianoKeys />;
        break;
      default:
        icon = <GiPianoKeys />;
        break;
    }
    return (
      <div
        css={css`
          cursor: pointer;
          margin: 10px;
          width: 100px;
          font-size: 70px;
          height: 100px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 5%;
          background: ${theme.colors.grey.accent};
          &:hover {
            box-shadow: ${theme.shadows.innerDarken};
          }
        `}
      >
        {icon}
      </div>
    );
  };

  TrackLayers = () =>
    this.props.sequenceData.tracks.map((track, idx) => (
      <div
        key={idx}
        style={{
          backgroundColor: theme.colors.green.dark,
          display: "flex",
          alignItems: "center",
          borderRadius: 12,
          margin: "20px 0",
        }}
      >
        {this.InstrumentIcon(track.instrument)}
        <TrackNotesGrid trackIndex={idx} blockId={this.props.sequenceID} />
      </div>
    ));

  addNewTrack = (instrument = "PIANO") => {
    this.props.dispatch(
      actions.addTrack(this.props.sequenceID, {
        id: IdMaker(),
        instrument: instrument,
        notes: [],
      })
    );
  };

  render() {
    return (
      <div
        css={css`
          padding: 30px 20px;
          color: white;
          min-height: 75vh;
          height: 100%;
          width: 100vw;
          background: ${theme.colors.grey.darker};
          overflow-y: auto;
        `}
      >
        <div
          css={css`
            display: flex;
            justify-content: space-between;
            align-items: center;
          `}
        >
          {this.ExitButton()}
          <Typography
            css={css`
              max-width: 300px;
            `}
          >
            Right-click to Enable / Disable a Note. Left-click to switch between
            Sharp / Flat.
          </Typography>
        </div>

        <div
          css={css`
            padding: 20px 40px;
          `}
        >
          <Row>
            <Col xs={12}>
              <h1
                css={css`
                  font-weight: ${theme.font.weights.black};
                  font-size: ${theme.font.sizes.large};
                `}
              >
                {this.props.sequenceData.name}
              </h1>
            </Col>
          </Row>
          {!this.props.sequenceData.tracks.length && (
            <Row>
              <Col
                css={css`
                  display: flex;
                  justify-content: center;
                  margin: 10px 0;
                `}
              >
                <h2>{"You don't have any tracks yet."}</h2>
              </Col>
            </Row>
          )}
          <Row>
            <Col>
              <div
                //onClick={(e) => this.setEditingTrack(!this.state.editingTrack)} // Fix
                css={css`
                  display: flex;
                  justify-content: center;
                  cursor: pointer;
                `}
              >
                {!this.state.editingTrack ? (
                  <FontAwesomeIcon
                    onClick={this.addNewTrack}
                    icon={faPlusCircle}
                    size="3x"
                    color={theme.colors.buttons.green.normal}
                    css={css`
                      &:hover {
                        color: ${theme.colors.buttons.green.dim};
                      }
                    `}
                  />
                ) : (
                  <Button color={"primary"}>Close</Button>
                )}
              </div>
            </Col>
          </Row>
          {this.TrackLayers()}
        </div>
      </div>
    );
  }
}

NotesLayout.propTypes = {
  sequenceData: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.string,
    bpm: PropTypes.number,
    noteValue: PropTypes.number,
    tracks: PropTypes.array,
  }),
  sequenceUpdater: PropTypes.func,
  onExit: PropTypes.func,
  sequenceID: PropTypes.string,
  dispatch: PropTypes.func,
};
export default connect(mapStateToProps)(NotesLayout);
