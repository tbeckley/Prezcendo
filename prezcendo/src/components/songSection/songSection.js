/** @jsx jsx */
import { jsx, css } from "@emotion/core";
import { theme } from "./../../helpers/theme";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

const ConnectionBar = styled.div`
  background: ${theme.colors.grey.light};
  width: 4vw;
  height: 10px;
`;
const SongSection = ({
  sectionName,
  color = "blue",
  isFirst = false,
  clickable = true,
}) => {
  const Block = () => (
    <div
      css={css`
        background: ${theme.colors[color].light};
        color: ${theme.colors[color].dark};
        display: flex;
        width: 100%;
        min-width: 225px;
        height: 100px;
        border-radius: 20px;
        align-items: center;
        justify-content: center;
        box-shadow: ${clickable
          ? `${theme.shadows.dark}`
          : `${theme.shadows.innerDarken}`};
        cursor: ${clickable ? "pointer" : "not-allowed"};
        &:hover {
          box-shadow: ${clickable
            ? `${theme.shadows.innerDim}, ${theme.shadows.light}`
            : ""};
        }
      `}
    >
      <h1
        css={css`
          padding: 10px;
          font-weight: ${theme.font.weights.black};
        `}
      >
        {sectionName}
      </h1>
    </div>
  );

  return (
    <div
      css={css`
        display: flex;
        align-items: center;
        justify-content: center;
      `}
    >
      {!isFirst && <ConnectionBar />}
      <Block />
      <ConnectionBar />
    </div>
  );
};

SongSection.propTypes = {
  sectionName: PropTypes.string,
  color: PropTypes.oneOf(Object.keys(theme.colors)),
  isFirst: PropTypes.bool,
  clickable: PropTypes.bool,
};
export default SongSection;
