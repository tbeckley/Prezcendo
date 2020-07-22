import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import PropTypes from "prop-types";
import actions from "../../store/actions";

function mapStateToProps(state, ownProps) {
  const modal = state.interfaceSettings.modal;
  const currentBridge = state.bridges[modal.selectedBridge].currentBridge;

  return {
    selected: ownProps.revisionID == modal.selectedRevision,
    current: ownProps.revisionID == currentBridge,
  };
}

class HistoryBlock extends Component {
  constructor(props) {
    super(props);
  }

  select = () => {
    this.props.dispatch(
        actions.setSelectedTransition(
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
          GENERATION {this.props.revisionID + 1}
        </Button>
      </div>
    );
  }
}

HistoryBlock.propTypes = {
  style: PropTypes.object,
  revisionID: PropTypes.number,
  childID: PropTypes.number,
  selected: PropTypes.bool,
  dispatch: PropTypes.func,
  current: PropTypes.bool,
};

export default connect(mapStateToProps)(HistoryBlock);
