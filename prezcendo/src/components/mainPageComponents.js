import React from 'react';
import '../css/App.css';

import { Modal, ModalHeader, ModalBody } from 'reactstrap';

export class HeaderComponent extends React.Component {
    render() {
        return(
            <header className="App-header">
                <img src={ require( '../assets/prezcendo_menu.PNG' ) } style={{height: "32px"}} alt="menu" />
                <img src={ require( '../assets/prezcendo_title.PNG' ) }   style={{height: "31px"}} alt="title" />
                <img src={ require( '../assets/prezcendo_collab.PNG' ) }  style={{height: "36px"}} alt="collab" />
            </header>
        );
    }
}

export class ContainerComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state={
          isOpen: true,
          versionA: true,
        };
    }
    
    render() {
        return(
            <div className="App-container">
                <div style={{position: "relative"}}>
                    <img src={ require( '../assets/prezcendo_blocks.PNG' ) } style={{height: "auto", width: "100%"}} alt="blocks" />
                    <button className="App-bridge-button left"/>
                    <button className="App-bridge-button middle"/>
                    <button className="App-bridge-button right" onClick={ () => this.setState({ isOpen: true })} />
                </div>
                <Modal isOpen={ this.state.isOpen } toggle={ () => this.setState({ isOpen: false }) } centered>
                    <ModalHeader toggle={ () => this.setState({ isOpen: false }) }>Title</ModalHeader>
                    <ModalBody>
                    1
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}
