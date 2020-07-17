/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { theme } from "./../../helpers/theme";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle, faPlusCircle } from "@fortawesome/free-solid-svg-icons";
import { Typography } from "../algorithmInterface/common";
import { Row, Col, Button } from "reactstrap";
import { useState, useEffect } from "react";
import styled from "@emotion/styled";
import { IdMaker } from "../../helpers/unitHelper";
import { GiPianoKeys } from "react-icons/gi";

const NotesLayout = ({ sequenceData, sequenceUpdater, onExit }) => {
  const [editingTrack, setEditingTrack] = useState(false);

  const ExitButton = () => (
    <div
      onClick={onExit}
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

  const InstrumentTrack = styled.div`
    margin: 5px 0;
    color: white;
    width: 100%;
    min-height: 125px;
  `;

  const InstrumentIcon = (instrumentName) => {
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

  const TrackLayers = sequenceData.tracks.map((track) => {
    return (
      <div
        key={`track_${track.index}`}
        css={css`
          margin: 20px 0;
          background: ${theme.colors.grey.dark};
          display: flex;
          align-items: center;
          border-radius: 12px;
        `}
      >
        <InstrumentIcon instrumentName={track.instrument} />
        <InstrumentTrack track={track}>
          <p> {track.id}</p>
        </InstrumentTrack>
      </div>
    );
  });

  const addNewTrack = (instrument = "PIANO") => {
    const newTracks = [
      ...sequenceData.tracks,
      { id: IdMaker(), instrument: instrument, notes: [] },
    ];
    sequenceUpdater({ ...sequenceData, tracks: newTracks });
  };

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
        <ExitButton />
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
              {sequenceData.name}
            </h1>
          </Col>
        </Row>
        {/* <Row>
          <Col>
            <button
              onClick={(e) => {
                sequenceUpdater({ ...sequenceData, name: "Cool Name" });
              }}
            >
              Click me and the Name of this section will change!
            </button>
          </Col>
          <Col>{JSON.stringify(sequenceData)}</Col>
        </Row> */}
        {!sequenceData.tracks.length && (
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
              onClick={(e) => setEditingTrack(!editingTrack)}
              css={css`
                display: flex;
                justify-content: center;
                cursor: pointer;
              `}
            >
              {!editingTrack ? (
                <FontAwesomeIcon
                  onClick={(e) => addNewTrack()}
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
        {TrackLayers}
      </div>
    </div>
  );
};

NotesLayout.propTypes = {
  sequenceData: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    bpm: PropTypes.number,
    noteValue: PropTypes.number,
    tracks: PropTypes.array,
  }),
  sequenceUpdater: PropTypes.func,
  onExit: PropTypes.func,
};
export default NotesLayout;
