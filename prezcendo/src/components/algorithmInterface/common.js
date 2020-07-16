import styled from "@emotion/styled";
import React from "react";
import PropTypes from "prop-types";

import { Button, Tooltip, OverlayTrigger, Row, Col, ProgressBar, Form } from "react-bootstrap";

import { TRANSITION_SLIDERS } from "../../constants";

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

export const TooltipButton = ({ buttonText, tooltipText = "Currently not available", onClick = () => {} } ) => {
  return (
    <OverlayTrigger
      placement="bottom"
      overlay={<Tooltip> { tooltipText } </Tooltip> } >
      <Button color={"primary"} onClick={onClick}>{buttonText}</Button>
    </OverlayTrigger>
  );
};

TooltipButton.propTypes = {
  buttonText: PropTypes.string,
  tooltipText: PropTypes.string,
  onClick: PropTypes.func,
};

export class SlidersDisplay extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Row>
        { Object.keys(this.props.parameters).map( ( parameter ) => [
          <Col md={3} key={0} style={{textAlign: "right"}}>
            <Typography>{ TRANSITION_SLIDERS[parameter].names[0] }</Typography>
          </Col>,
          <Col md={6} key={1} style={{textAlign: "center"}}>
            { this.props.changeSlider 
              ? <Form.Control 
                  type="range" 
                  min={ TRANSITION_SLIDERS[parameter].min }
                  max={ TRANSITION_SLIDERS[parameter].max }
                  value={ this.props.parameters[parameter] } 
                  onChange={ (e) => this.props.changeSlider(parameter, e.target.value) } />
              : <ProgressBar now={ this.props.parameters[parameter] / TRANSITION_SLIDERS[parameter].max * 100 } />
            }
            <Typography>{ this.props.parameters[parameter] }</Typography>
          </Col>,
          <Col md={3} key={2} style={{textAlign: "left"}}>
              <Typography>{ TRANSITION_SLIDERS[parameter].names[1] }</Typography>
          </Col>
        ] ) }
      </Row>
    );
  }
}

SlidersDisplay.propTypes = {
  parameters: PropTypes.object,
  editable: PropTypes.bool,
  changeSlider: PropTypes.func,
};
