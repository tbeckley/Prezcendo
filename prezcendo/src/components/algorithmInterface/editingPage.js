/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";
import "../../css/VersionB.css";

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
};

export default EditingPage;

const Sliders = () => {
  return(
    <div>
      <input type="range" className="custom-range" id="customRange1" min="-100" max="100" step="50" value="0"
        onChange={ () => console.log("changing value")}
      />
      <input type="range" className="custom-range" id="customRange1" min="-100" max="100" step="50" value="0"
        onChange={ () => console.log("changing value")}
      />
      <input type="range" className="custom-range" id="customRange1" min="-100" max="100" step="50" value="0"
        onChange={ () => console.log("changing value")}
      />
    </div>

  );
};
