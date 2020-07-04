import React from "react";
import "../css/App.css";

import { Modal, ModalHeader, ModalBody } from "reactstrap";
import EditingPage from "./algorithmInterface/editingPage";

export class HeaderComponent extends React.Component {
  render() {
    return (
      <header className="App-header">
        <img
          src={require("../assets/prezcendo_menu.PNG")}
          style={{ height: "32px" }}
          alt="menu"
        />
        <img
          src={require("../assets/prezcendo_title.PNG")}
          style={{ height: "31px" }}
          alt="title"
        />
        <img
          src={require("../assets/prezcendo_collab.PNG")}
          style={{ height: "36px" }}
          alt="collab"
        />
      </header>
    );
  }
}

<<<<<<< HEAD
export const ContainerComponent = () => {
  const [bridgeEditorOpen, setBridgeEditorOpen] = React.useState(false);
  //   const [prototypeVersion, setPrototypeVersion] = React.useState("1");

  return (
    <div className="App-container">
      <div style={{ position: "relative" }}>
        <img
          src={require("../assets/prezcendo_blocks.PNG")}
          style={{ height: "auto", width: "100%" }}
          alt="blocks"
        />
        <button className="App-bridge-button left" />
        <button className="App-bridge-button middle" />
        <button
          className="App-bridge-button right"
          onClick={() => setBridgeEditorOpen(true)}
        />
=======
export class ContainerComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
      versionA: false,
      bridge: {
        history: [],
        playback: [1,2,3],
        edits: [],
      },
    };
  }

  toggle() {
      this.setState({ versionA: !this.state.versionA });
  }

  render() {
    return (
      <div className="App-container">
        <div style={{ position: "relative" }}>
          <img
            src={require("../assets/prezcendo_blocks.PNG")}
            style={{ height: "auto", width: "100%" }}
            alt="blocks"
          />
          <button className="App-bridge-button left" />
          <button className="App-bridge-button middle" />
          <button
            className="App-bridge-button right"
            onClick={() => this.setState({ isOpen: true })}
          />
          <button color="primary" onClick={() => this.toggle()} style={{ marginBottom: '1rem' }}>Toggle</button>
        </div>
        <Modal
          isOpen={this.state.isOpen}
          toggle={() => this.setState({ isOpen: false })}
          centered
        >
          <ModalHeader toggle={() => this.setState({ isOpen: false })}>
            Title
          </ModalHeader>
          <ModalBody>
            <EditingPage 
                versionA={ this.state.versionA }
                bridge={ this.state.bridge }
            />
          </ModalBody>
        </Modal>
>>>>>>> 70c8f76... Added versionB sliders
      </div>
      <Modal
        isOpen={bridgeEditorOpen}
        toggle={() => setBridgeEditorOpen(false)}
        centered
      >
        <ModalHeader toggle={() => setBridgeEditorOpen(false)}>
          Title
        </ModalHeader>
        <ModalBody>
          <EditingPage onExit={() => setBridgeEditorOpen(false)} />
        </ModalBody>
      </Modal>
    </div>
  );
};
