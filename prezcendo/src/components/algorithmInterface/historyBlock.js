import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import actions from "../../store/actions";

function mapStateToProps(state, ownProps) {
  const modal = state.interfaceSettings.modal;
  const currentRevision = state.bridges[modal.selectedBridge].currentRevision;

  return {
    selected: ownProps.revisionID == modal.selectedRevision,
    current: ownProps.revisionID == currentRevision,
  };
}

class HistoryBlock extends Component {

  select = () => {
    this.props.dispatch(
        actions.setSelectedRevision(
            this.props.revisionID));
}

  render() {
    return (
      <div className="VersionB Playback-Button" onClick={this.select}>
        {this.props.current && <i className="fas fa-star" />}
        <Button
          className={this.props.selected ? "btn-success" : "btn-primary"}
          style={{ width: "140px", height: "70px" }}
        >
          TRANSITION {this.props.revisionID + 1}
        </Button>
      </div>
    );
  }
}

HistoryBlock.propTypes = {
  style: PropTypes.object,
  revisionID: PropTypes.number,
  selected: PropTypes.bool,
  dispatch: PropTypes.func,
  current: PropTypes.bool,
};

export default connect(mapStateToProps)(HistoryBlock);
