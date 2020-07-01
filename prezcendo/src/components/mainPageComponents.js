import React from 'react';
import '../css/App.css';

export class HeaderComponent extends React.Component {
    render() {
        return(
            <header className="App-header">
                <img src={ require( '../assets/prezcendo_menu.PNG' ) } style={{height: "32px"}} alt="menu" />
                <img src={ require( '../assets/prezcendo_title.PNG' ) }   style={{height: "31px"}} alt="title" />
                <img src={ require( '../assets/prezcendo_collab.PNG' ) }  style={{height: "36px"}} alt="collab" />
            </header>
        )
    }
}

export class ContainerComponent extends React.Component {
    render() {
        return(
            <div className="App-container">
                <div style={{position: "relative"}}>
                    <img src={ require( '../assets/prezcendo_blocks.PNG' ) } style={{height: "auto", width: "100%"}} alt="blocks" />
                    <button className="App-bridge-button left"/>
                    <button className="App-bridge-button middle"/>
                    <button className="App-bridge-button right"/>
                </div>
            </div>
        )
    }
}