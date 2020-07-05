/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import React, { useState } from "react";
import PropTypes from "prop-types";
import option1audio from "../../assets/mock/audio/bridge_final_iteration.mp3";

import option2audio from "../../assets/mock/audio/bridge_iterationOption2.mp3";
import option3audio from "../../assets/mock/audio/bridge_iterationOption3.mp3";

import {
  Container,
  Row,
  Col,
  Carousel,
  CarouselItem,
  Input,
  Button,
  Spinner,
  UncontrolledTooltip,
} from "reactstrap";
import { Typography } from "./common";
import styled from "@emotion/styled";

const loadingWrapper = (text) => {
  return (
    <div>
      <Typography>{text}</Typography>
      <Spinner size="lg" />
    </div>
  );
};

const PaddedRow = styled(Row)`
  padding-bottom: 15px;
`;
const SettingsControl = ({ onExit }) => {
  const [transitionLength, setTransitionLength] = React.useState("-");
  const [loading, setLoading] = React.useState(false);
  //   const [favouriteTransition, setFavouriteTransition] = React.useState();

  const loadingPageTransition = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setActiveIndex(activeIndex + 1);
    }, 2500);
  };

  const instantPageTransition = () => setActiveIndex(activeIndex + 1);
  const introductionPage = (
    <Container>
      <PaddedRow>
        <Typography>
          Make a Computer Generated Transition between the{" "}
          <span
            css={css`
              color: rgb(164, 215, 232);
            `}
          >
            Chorus
          </span>{" "}
          and the{" "}
          <span
            css={css`
              color: rgb(194, 164, 232);
            `}
          >
            Ending{" "}
          </span>
        </Typography>
      </PaddedRow>

      <PaddedRow>
        <Col>
          <Typography>Transition Length (Seconds)</Typography>
        </Col>
        <Col xs={"1"}>
          <Typography>{transitionLength}</Typography>
        </Col>
        <Col>
          <Input
            type="range"
            min="1"
            max="10"
            onChange={(e) => setTransitionLength(e.target.value)}
          ></Input>
        </Col>
      </PaddedRow>
      <PaddedRow>
        <Col>
          <Button
            color={"primary"}
            disabled={!(transitionLength > 0)}
            onClick={loadingPageTransition}
          >
            Generate!
          </Button>
        </Col>
      </PaddedRow>
    </Container>
  );

  const generationPage = (
    <Container>
      <PaddedRow>
        <Typography>
          Generation Complete! Take a listen to your transition with the audio
          player!
        </Typography>
      </PaddedRow>
      <Row>
        <Col>
          <Button onClick={() => onExit()}>Use This Transition</Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Typography>or</Typography>
        </Col>
      </Row>
      <Row>
        <Col>
          <Button onClick={instantPageTransition}>Make more Variations</Button>
        </Col>
      </Row>
    </Container>
  );

  const parameterPage = (
    <Container>
      <PaddedRow>
        <Col>
          <Typography>Generate Something that Sounds:</Typography>
        </Col>
        <Col>
          <Input type="select">
            <option>Happy</option>
            <option>Energetic</option>
            <option>Frantic</option>
            <option>Calm</option>
            <option>Depressed</option>
          </Input>
        </Col>
        <Col>
          <Button color="primary" onClick={loadingPageTransition}>
            Go!{" "}
          </Button>
        </Col>
      </PaddedRow>
      <PaddedRow>
        <Col>
          <Typography>Or</Typography>
        </Col>
      </PaddedRow>
      <PaddedRow>
        <Col>
          <Typography>Generate Something random</Typography>
        </Col>

        <Col>
          <Button color="primary" onClick={loadingPageTransition}>
            Go!
          </Button>
        </Col>
      </PaddedRow>
    </Container>
  );

  const selectionPage = (
    <Container>
      <PaddedRow>
        <Col>
          <Typography>
            The algorithm has finished making different variations. Select which
            one you want to use.
          </Typography>
        </Col>
      </PaddedRow>

      <PaddedRow
        css={css`
          align-items: center;
        `}
      >
        <Col xs={1}>
          <input type="radio" name="radio1" />
        </Col>
        <Col xs={11}>
          Option 1
          <audio
            controls
            src={option1audio}
            css={css`
              width: 100%;
            `}
          ></audio>
        </Col>
      </PaddedRow>
      <PaddedRow
        css={css`
          align-items: center;
        `}
      >
        <Col xs={1}>
          <input type="radio" name="radio2" />
        </Col>
        <Col xs={11}>
          Option 2
          <audio
            controls
            src={option2audio}
            css={css`
              width: 100%;
            `}
          ></audio>
        </Col>
      </PaddedRow>
      <PaddedRow
        css={css`
          align-items: center;
        `}
      >
        <Col xs={1}>
          <input type="radio" name="radio3" />
        </Col>
        <Col xs={11}>
          Option 3
          <audio
            controls
            src={option3audio}
            css={css`
              width: 100%;
            `}
          ></audio>
        </Col>
      </PaddedRow>

      <PaddedRow>
        <Col>
          <Button color="primary" onClick={() => onExit()}>
            Use Selected Transition
          </Button>
        </Col>
        <Col>
          <Button disabled={true}>
            <span id="UncontrolledTooltipExamples">Generate 3 new choices</span>{" "}
          </Button>

          <UncontrolledTooltip
            target="UncontrolledTooltipExamples"
            placement="right"
          >
            Sorry, this feature is disabled for this demo!
          </UncontrolledTooltip>
        </Col>
      </PaddedRow>
    </Container>
  );

  const items = [
    <div key="page1">
      {!loading && introductionPage}
      {loading && loadingWrapper("The algorithm is generating a transition...")}
    </div>,
    <div key="page2">{generationPage}</div>,
    <div key="page3">
      {!loading && parameterPage}
      {loading && loadingWrapper("Building Variations...")}
    </div>,
    <div key="page4">{selectionPage}</div>,
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === items.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  };

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? items.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  };

  const slides = items.map((item, index) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={`carousel-${index}`}
      >
        {item}
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      interval={false}
    >
      {slides}
    </Carousel>
  );
};

SettingsControl.propTypes = {
  onExit: PropTypes.func,
};
export default SettingsControl;
