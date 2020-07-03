import PropTypes from "prop-types";
import React from "react";
import EditingPage from "./editingPage";
import { FlexRow, IconButton } from "./common";
import { ReactComponent as CloseIcon } from "../../assets/icons/close.svg";

const InterfacePopup = ({ onCloseClick }) => {
  const closeIfExternalClick = (event) => {
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      onCloseClick();
    }
  };
  const wrapperRef = React.useRef(null);

  React.useEffect(() => {
    document.addEventListener("click", closeIfExternalClick, false);
    return () => {
      document.removeEventListener("click", closeIfExternalClick, false);
    };
  }, []);

  return (
    <div className={"Modal-container"}>
      <div className={"Modal-content"} ref={wrapperRef}>
        <FlexRow>
          <IconButton onClick={onCloseClick} className={"Icon-button"}>
            <CloseIcon width={"20px"} height={"20px"} fill={"#fff"}></CloseIcon>
          </IconButton>
        </FlexRow>
        <EditingPage />
      </div>
    </div>
  );
};

InterfacePopup.propTypes = {
  onCloseClick: PropTypes.func,
};

export default InterfacePopup;
