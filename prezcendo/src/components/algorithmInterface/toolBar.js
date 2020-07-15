import React from "react";
import PropTypes from "prop-types";
import { Button } from "reactstrap";
import { FlexRow } from "./common";

class ToolBar extends React.Component {
    render() {
        return(
            <FlexRow style={{ margin: 0 }}>
                <Button>
                    View in tree
                </Button>
                Current Bridge:
                <div>
                    Playback bar
                </div>
            </FlexRow>
        );
    }
}

ToolBar.propTypes = {
    dispatch: PropTypes.func,
};

export default ToolBar;
