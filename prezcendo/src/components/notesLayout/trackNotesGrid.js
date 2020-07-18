import React, { Component } from "react";
import { connect } from "react-redux";

function mapStateToProps(state, ownProps) {
  return {
    initialTrackData: this.state.blocks.filter((b) => b.id === ownProps.blockId)[0].tracks[ownProps.trackIndex],
  };
}

class TrackNotesGrid extends Component {
  constructor(props) {
    super(props);
  }


  render() {
    return (<div>
        HELLO WORLD!

    </div>);
  }
}

export default connect(mapStateToProps)(TrackNotesGrid);
