import styled from "@emotion/styled";
import React from "react";
import PropTypes from "prop-types";

import { Button, Tooltip, OverlayTrigger } from "react-bootstrap";

export const FlexRow = styled.div`
  display: flex;
  flex-direction: row;
  padding: 5px 0;
  margin: 25px 0;
  align-items: center;
  text-align: center;
`;

export const FlexCol = styled.div`
  padding: 2%;

  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;
export const IconButton = styled.button`
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: flex-end;
`;

export const Typography = styled.div`
  padding: 2px 0;
`;

export const TooltipButton = ({ buttonText, tooltipText = "Currently not available"}) => {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip> { tooltipText } </Tooltip> } >
      <Button color={"primary"}>{buttonText}</Button>
    </OverlayTrigger>
  );
};

TooltipButton.propTypes = {
  buttonText: PropTypes.string,
  tooltipText: PropTypes.string,
};
