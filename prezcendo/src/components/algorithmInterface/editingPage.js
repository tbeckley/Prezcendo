/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import PropTypes from "prop-types";

import { FlexRow, Typography, FlexCol } from "./common";
import SettingsControl from "./settingsControl";
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
        <Typography>PLACEHOLDER -- History Bar</Typography>
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
          <Typography> Current Iteration: 37</Typography>
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
