import React from "react";
import PropTypes from "prop-types";

class ToolBar extends React.Component {
    render() {
        return(
            <toolbar>
                TOOLBAR
            </toolbar>
        );
    }
}

ToolBar.propTypes = {
    dispatch: PropTypes.func,
};

export default ToolBar;
