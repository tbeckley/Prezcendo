import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import waveFormImg from '../../assets/WaveForm.png';

import { Container, Row, Col, Button } from 'react-bootstrap';

import { MdPlayArrow, MdStop } from 'react-icons/md';

import { getObjectFromArray,
            playMusic, stopMusic,
            isPlaying, getMaxLength } from '../../helpers/midiHelper';

function mapStateToProps(state, ownProps) {
    let revDetails = state.bridges[ownProps.bridge].revisions[ownProps.rev];

    return {
        revDetails,
        hasMusic: Boolean(revDetails.MIDI),
    };
}


class MusicBox extends Component {
    constructor(props) {
        super(props);

        this.state = {
            playing: isPlaying()
        };
    }

    componentWillUnmount() {
        this.stop();
    }

    play = () => {
        playMusic(getObjectFromArray(this.props.revDetails.MIDI),
            () => this.setState({ playing: false }
        ));

        this.setState({
            playing: true
        });
    };

    stop = () => {
        stopMusic();

        this.setState({
            playing: false
        });
    };

    render() {
        let onClickFn = this.state.playing ? this.stop : this.play;
        let buttonIcon = this.state.playing ? (<MdStop size="50" />) : (<MdPlayArrow size="50" />);

        let time = Math.ceil(getMaxLength(getObjectFromArray(this.props.revDetails.MIDI)));

        return (
            <Container fluid style={this.props.style}>
                <Row style={{ borderStyle: 'solid', backgroundColor: this.props.revDetails.color }}>
                    <Col md={8}>
                        <span style={{ alignItems: "center", display: 'flex', flexDirection: 'column' }} >
                            {this.props.hasMusic ? `Bridge #${this.props.bridge} - Revision #${this.props.rev}` : 'No song selected'} <br />
                            <img src={waveFormImg} height={40} /> <br />
                            { this.props.hasMusic ? `Length - ${(time-(time%=60))/60+(9<time?':':':0')+time}` : `No song selected`}
                         </span>
                    </Col>
                    <Col md={4} style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                        <Button variant="light" size="lg" onClick={onClickFn} disabled={!this.props.hasMusic}>
                            {buttonIcon}
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    }
}

MusicBox.propTypes = {
    revDetails: PropTypes.object,
    bridge: PropTypes.number,
    rev: PropTypes.number,
    hasMusic: PropTypes.bool,
    style: PropTypes.object
};

MusicBox.defaultProps = {
    bridge: 0,
    rev: 0
  };

export default connect(mapStateToProps)(MusicBox);
