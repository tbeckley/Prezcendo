import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { connect } from "react-redux";

import TestComponent from "./components/testComponent";
import {
  HeaderComponent,
  ContainerComponent,
} from "./components/mainPageComponents";

function mapStateToProps() {
  return {};
}

class App extends Component {
  render() {
    return (
      <div>
        <HeaderComponent />
        <ContainerComponent />
      </div>
    );
  }
}

export default connect(mapStateToProps)(App);
