import React from "react";
import PropTypes from "prop-types";

import { ModalHeader } from "reactstrap";

export class ToolBar extends React.Component {
    render() {
        return(
            <ModalHeader toggle={this.props.toggle}>
                TOOLBAR
            </ModalHeader>
        );
    }
}

ToolBar.propTypes = {
    toggle: PropTypes.function,
};
