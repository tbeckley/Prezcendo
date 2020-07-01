import React, { Component } from 'react';
import { connect } from 'react-redux';

function mapStateToProps(state) {
    return {
        ...state
    };
}


class testComponent extends Component {
    render() {
        return (
            <div> 
                HELLO WORLD!
                {JSON.stringify(this.props)} 
                
                </div>
        );
    }
}


export default connect(mapStateToProps)(testComponent);
