import React, { Component } from "react";
import { connect } from "react-redux";
import * as R from "ramda";
import PropTypes, { string } from "prop-types";
import { Container, Row, Col } from "react-bootstrap";
import { SCALE_TYPES } from "../../constants";

function mapStateToProps(state, ownProps) {
  return {
    initialTrackData: state.blocks.filter((b) => b.id === ownProps.blockId)[0].tracks[ownProps.trackIndex],
  };
}

const GRID_HEIGHT = 8; // TBD
const GRID_WIDTH = 16; // TBD

class TrackNotesGrid extends Component {
  constructor(props) {
    super(props);

    const testingNotes = [{
      note: 0,
      time: 0,
      type: SCALE_TYPES.NATRUAL
    }];

    this.state = {
      notes: R.concat(testingNotes, props.initialTrackData.notes)
    };
  }

  handleClick = (note, time) => (e) => {
    const handleFunc = R.ifElse(R.compose(R.isEmpty, R.filter(R.whereEq({ note, time }))),
      R.append({ note, time, type: SCALE_TYPES.NATRUAL }),
      R.reject(R.whereEq({ note, time })));

    this.setState({
      notes: handleFunc(this.state.notes)
    });
  }

  handleRightClick = (note, time) => (e) => {
    const idx = R.findIndex(R.whereEq({ note, time }), this.state.notes); // Index in array

    if(idx !== -1) {
      this.setState({
        notes: R.adjust(idx, R.evolve({ type: R.pipe(R.inc, R.modulo(R.__, 3)) }), this.state.notes)
      });
    }

    e.preventDefault(); // Disable the right click context menu
  }

  hasNote = (note, time) => {
      const match = R.filter(R.whereEq({ note, time }), this.state.notes);
      return R.isEmpty(match) ? null : match[0].type;
  }

  getSquare = (row, col) => {
    const val = this.hasNote(row, col);

    return (<Col style={{ padding: 0}} key={col}>
      <div style={{ alignItems: "center", textAlign: "center", backgroundColor: val && "blue"}}
      onClick={this.handleClick(row, col)} onContextMenu={this.handleRightClick(row, col)}>
          {val == null ? "null" : val == 0 ? "b" : val == 1 ? "N" : "#"}
      </div>
    </Col>);
  }

  render() {
    console.log(this.state.notes);

    return (<Container fluid style={{}}>
      {R.range(0, GRID_HEIGHT).map(row => (<Row key={row}>
        {R.range(0, GRID_WIDTH).map(col => this.getSquare(row, col))}
      </Row>))}
    </Container>);
  }
}

TrackNotesGrid.propTypes = {
  initialTrackData: PropTypes.object
};

export default connect(mapStateToProps)(TrackNotesGrid);
