import React, { Component } from 'react';
import { connect } from "react-redux";
import { ProgressBar, Container, Row, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import { getPlaybackTime, isPlaying } from '../helpers/midiHelper';


function mapStateToProps() { // Stub
    return {
        // TODO - Determine whether or not this playback bar matches what is actually being played
    };
}

const UPDATE_FREQUENCY = 4; //Updates per second

class PlaybackBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            time: getPlaybackTime(),
            playing: isPlaying(),
            intervalID: setInterval(this.updatePropValuesFromMusic, 1000/UPDATE_FREQUENCY)
        };
    }

    updatePropValuesFromMusic = () => {
        this.setState({
            time: getPlaybackTime(),
            playing: isPlaying()
        });
    }

    componentWillUnmount() {
        // Cleanup on component unmount
        clearInterval(this.state.intervalID);
    }

    render() {
        return (
            <Container fluid>
                <Row>
                    <Col>
                        <ProgressBar min={0} max={this.props.duration} now={ this.state.time } style={{ width: '100%' }} />
                    </Col>
                </Row>
            </Container>
        );
    }
}

PlaybackBar.propTypes = {
    isDisabled: PropTypes.bool,
    duration: PropTypes.number
};

PlaybackBar.defaultProps = {
    isDisabled: false
};

export default connect(mapStateToProps)(PlaybackBar); // Stub for later
