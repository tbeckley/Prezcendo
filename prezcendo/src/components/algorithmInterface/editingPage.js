/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import "../../css/VersionB.css";
import { connect } from "react-redux";
import { Component } from "react";

import { FlexRow, FlexCol } from "./common";
import SettingsControl from "./settingsControl";

import HistoryBar from "../algorithmInterface/historyBar";
import MusicBox from '../algorithmInterface/musicBox';

const EditingPage = ({ onExit }) => {
  return (
    <div>
      <FlexRow
        css={css`
          justify-content: center;
          background: rgba(38, 38, 38);
          height: 100px;
        `}
      >
        <HistoryBar bridgeID={0} />
      </FlexRow>
      <FlexRow
        css={css`
          height: 50vh;
        `}
      >
        <FlexCol
          css={css`
            width: 50%;
            margin-right: 3%;
          `}
        >
          <MusicBox />
        </FlexCol>
        <FlexCol
          css={css`
            width: 50%;
            align-items: center;
            justify-content: center;
          `}
        >
          {/* Selection Box */}

          <SettingsControl onExit={onExit} />
        </FlexCol>


      </FlexRow>
    </div>
  );
};

EditingPage.propTypes = {
  onExit: PropTypes.func,
  bridgeVersionA: PropTypes.bool,
  revisions: PropTypes.array,
  dispatch: PropTypes.func,
};

function mapStateToProps(state, ownProps) {
  return {
    revisions: state.bridges[0].revisions,
    ...ownProps,
  };
}

export default connect(mapStateToProps)(EditingPage);

class VersionBGenerate extends Component {
  constructor(props) {
      super(props);
  }

  createRevision = () => {
    if(this.props.revisions.length == 0) {
        // Create a revision
        this.props.dispatch(actions.createRevision(0, 0)); // Create a dummy revision
    }
  }

  render() {
    return(
      <div className="VersionB Generate">
        <img 
          src={require("../../assets/GenreMap.PNG")}
          alt="Genre Map"
          style={{ height: "350px"}}
        />
        <div>
          <input type="range" id="customRange1" min="-100" max="100" step="50" value="0"
            onChange={ () => console.log("changing value")}
          />
          <input type="range" id="customRange1" min="-100" max="100" step="50" value="0"
            onChange={ () => console.log("changing value")}
          />
          <input type="range" id="customRange1" min="-100" max="100" step="50" value="0"
            onChange={ () => console.log("changing value")}
          />
        </div>
        <div className="VersionB Button-Container">
          <button className="VersionB Button" onClick={this.createRevision}>
            Generate
          </button>
          <button className="VersionB Button">
            Clear
          </button>
        </div>
      </div>
    );
  }
}

VersionBGenerate.propTypes = {
  dispatch: PropTypes.func,
  revisions: PropTypes.array,
};
