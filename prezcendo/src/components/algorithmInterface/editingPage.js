/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React from "react";

import { FlexRow, Typography, FlexCol } from "./common";

const EditingPage = () => {
  return (
    <React.Fragment>
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
          height: 75%;
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
          `}
        >
          Selection Box
        </FlexCol>
      </FlexRow>
    </React.Fragment>
  );
};

export default EditingPage;
