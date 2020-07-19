import React, { Component } from "react";
import { connect } from "react-redux";
import * as R from "ramda";
import PropTypes from "prop-types";
import { Container, Row, Col, Button } from "react-bootstrap";
import { SCALE_TYPES } from "../../constants";
import actions from "../../store/actions";
/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { theme } from "./../../helpers/theme";
import styled from "@emotion/styled";

function mapStateToProps(state, ownProps) {
  return {
    initialTrackData: state.blocks.filter((b) => b.id === ownProps.blockId)[0]
      .tracks[ownProps.trackIndex],
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    updateTrack: (notes) =>
      dispatch(
        actions.updateTrack(ownProps.blockId, ownProps.trackIndex, notes)
      ),
  };
}

const BasicNoteSquare = styled.div`
  width: 4.5vw;
  height: 4.5vw;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border: 0.5px solid #989898;
  background: ${theme.colors.grey.dark2};
`;

const GRID_HEIGHT = 8; // TBD
const GRID_WIDTH = 16; // TBD

class TrackNotesGrid extends Component {
  constructor(props) {
    super(props);

    const testingNotes = [
      {
        note: 0,
        time: 0,
        type: SCALE_TYPES.NATRUAL,
      },
    ];

    this.state = {
      notes: R.concat(testingNotes, props.initialTrackData.notes),
    };
  }

  handleClick = (note, time) => () => {
    const handleFunc = R.ifElse(
      R.compose(R.isEmpty, R.filter(R.whereEq({ note, time }))),
      R.append({ note, time, type: SCALE_TYPES.NATRUAL }),
      R.reject(R.whereEq({ note, time }))
    );

    this.setState({
      notes: handleFunc(this.state.notes),
    });
  };

  handleRightClick = (note, time) => (e) => {
    const idx = R.findIndex(R.whereEq({ note, time }), this.state.notes); // Index in array

    if (idx !== -1) {
      this.setState({
        notes: R.adjust(
          idx,
          R.evolve({ type: R.pipe(R.inc, R.modulo(R.__, 3)) }),
          this.state.notes
        ),
      });
    }

    e.preventDefault(); // Disable the right click context menu
  };

  hasNote = (note, time) => {
    const match = R.filter(R.whereEq({ note, time }), this.state.notes);
    return R.isEmpty(match) ? null : match[0].type;
  };

  getSquare = (row, col) => {
    const val = this.hasNote(row, col);

    return (
      <div
        key={col}
        css={css`
          display: flex;
          flex-direction: column;
        `}
      >
        <BasicNoteSquare
          onClick={this.handleClick(row, col)}
          onContextMenu={this.handleRightClick(row, col)}
          css={css`
            cursor: pointer;
            background: ${val === null
              ? theme.colors.grey.dark2
              : theme.colors.buttons.teal.normal};
            &:hover {
              box-shadow: ${theme.shadows.innerDarken};
            }
          `}
        >
          {val === SCALE_TYPES.SHARP
            ? "#"
            : val === SCALE_TYPES.FLAT
            ? "b"
            : ""}
        </BasicNoteSquare>
      </div>
    );
  };

  SCALE_VALUES = ["C", "D", "E", "F", "G", "A", "B", "C"];
  render() {
    return (
      <div
        css={css`
          display: flex;
          flex-direction: column;
          justify-content: center;
          padding: 20px;
          align-items: center;
        `}
      >
        {R.range(0, GRID_HEIGHT).map((row, index) => (
          <div
            key={row}
            css={css`
              display: flex;
              flex-direction: row;
            `}
          >
            <BasicNoteSquare>{this.SCALE_VALUES[index]}</BasicNoteSquare>

            {R.range(0, GRID_WIDTH).map((col) => this.getSquare(row, col))}
          </div>
        ))}

        <div
          css={css`
            margin: 10px 0;
            display: flex;
            justify-content: center;
          `}
        >
          <Button onClick={() => this.props.updateTrack(this.state.notes)}>
            SAVE
          </Button>
        </div>
      </div>
    );
  }
}

TrackNotesGrid.propTypes = {
  initialTrackData: PropTypes.object,
  updateTrack: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(TrackNotesGrid);
