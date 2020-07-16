import React from "react";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { FlexRow } from "./common";

import MusicBox from './musicBox';

class ToolBar extends React.Component {
    render() {
        return(
            <FlexRow style={{ margin: 0 }}>
                <Button>
                    View in tree
                </Button>
                Current Bridge:
                <MusicBox style={{width: '20%' }} bridge={0} rev={0} />
            </FlexRow>
        );
    }
}

ToolBar.propTypes = {
    dispatch: PropTypes.func,
};

export default ToolBar;
