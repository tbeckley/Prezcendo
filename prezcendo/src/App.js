import "bootstrap/dist/css/bootstrap.min.css";
import React, { Component } from "react";
import { connect } from "react-redux";

import ContainerComponent, {
  HeaderComponent,
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
