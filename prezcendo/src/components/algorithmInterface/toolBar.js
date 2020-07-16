import React from "react";
import PropTypes from "prop-types";
import { FlexRow, TooltipButton } from "./common";

import MusicBox from './musicBox';

class ToolBar extends React.Component {
    render() {
        return(
            <FlexRow style={{ margin: 0 }}>
                Current Bridge:
                <MusicBox bridge={0} rev={0} minimal={true} />
                <TooltipButton buttonText="View in tree" />
                <TooltipButton buttonText="Remove current bridge" />
            </FlexRow>
        );
    }
}

ToolBar.propTypes = {
    dispatch: PropTypes.func,
};

export default ToolBar;
