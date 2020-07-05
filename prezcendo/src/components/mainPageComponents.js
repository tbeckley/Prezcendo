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

export const ContainerComponent = () => {
  const [bridgeEditorOpen, setBridgeEditorOpen] = React.useState(false);
  const [bridgeVersionA, setBridgeVersionA] = React.useState(true);
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
      </div>
      <button onClick={ () => setBridgeVersionA(!bridgeVersionA)} >Toggle</button>
      <Modal
        isOpen={bridgeEditorOpen}
        toggle={() => setBridgeEditorOpen(false)}
        centered
      >
        <ModalHeader toggle={() => setBridgeEditorOpen(false)}>
          Title
        </ModalHeader>
        <ModalBody>
          <EditingPage 
            onExit={() => setBridgeEditorOpen(false)} 
            bridgeVersionA={ bridgeVersionA }
          />
        </ModalBody>
      </Modal>
    </div>
  );
};
