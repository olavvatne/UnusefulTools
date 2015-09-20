import React, { Component, PropTypes } from 'react';

function hasGetUserMedia() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

class ReactCam extends Component {

    constructor() {
        super();
        this.state = {
            hasUserMedia: false
        };
    }

    componentDidMount() {
        if (!hasGetUserMedia()) return;

        ReactCam.mountedInstances.push(this);

        if (!this.state.hasUserMedia && !ReactCam.userMediaRequested) {
            this.requestUserMedia();
        }
    }

    requestUserMedia() {
        navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;

        let sourceSelected = (audioSource, videoSource) => {
            let constraints = {
                video: {
                    optional: [{sourceId: videoSource}]
                }
            };

            if (this.props.audio) {
                constraints.audio = {
                    optional: [{sourceId: audioSource}]
                };
            }

            navigator.getUserMedia(constraints, (stream) => {
                ReactCam.mountedInstances.forEach((instance) => instance.handleUserMedia(null, stream));
            }, (e) => {
                ReactCam.mountedInstances.forEach((instance) => instance.handleUserMedia(e));
            });
        };

        if (this.props.audioSource && this.props.videoSource) {
            sourceSelected(this.props.audioSource, this.props.videoSource);
        } else {
            MediaStreamTrack.getSources((sourceInfos) => {
                let audioSource = null;
                let videoSource = null;

                sourceInfos.forEach((sourceInfo) => {
                    if (sourceInfo.kind === 'audio') {
                        audioSource = sourceInfo.id;
                    } else if (sourceInfo.kind === 'video') {
                        videoSource = sourceInfo.id;
                    }
                });

                sourceSelected(audioSource, videoSource);
            });
        }

        ReactCam.userMediaRequested = true;
    }

    handleUserMedia(error, stream) {
        if (error) {
            this.setState({
                hasUserMedia: false
            });

            return;
        }

        let src = window.URL.createObjectURL(stream);

        this.stream = stream;
        this.setState({
            hasUserMedia: true,
            src
        });

        if (this.props.onUserMedia) {
            this.props.onUserMedia();
        }
    }

    componentWillUnmount() {
        let index = ReactCam.mountedInstances.indexOf(this);
        ReactCam.mountedInstances.splice(index, 1);

        if (ReactCam.mountedInstances.length === 0 && this.state.hasUserMedia) {
            this.stream.stop();
            ReactCam.userMediaRequested = false;
            window.URL.revokeObjectURL(this.state.src);
        }
    }

    getScreenshot() {
        if (!this.state.hasUserMedia) return;

        let canvas = this.getCanvas();
        return canvas.toDataURL('image/png');
    }

    getCanvas() {
        if (!this.state.hasUserMedia) return;

        const video = React.findDOMNode(this);
        if (!this.ctx) {
            let canvas = document.createElement('canvas');
            canvas.height = video.clientHeight;
            canvas.width = video.clientWidth;
            this.canvas = canvas;
            this.ctx = canvas.getContext('2d');
        }

        const {ctx, canvas} = this;
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

        return canvas;
    }

    render() {
        return (
            <video
                autoPlay
                width={this.props.width}
                height={this.props.height}
                src={this.state.src}
                />
        );
    }
}

ReactCam.propTypes = {
    audio: PropTypes.bool,
    onUserMedia: PropTypes.func,
    height: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    width: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ])
}
ReactCam.defaultProps = {
    audio: true,
    height: 480,
    width: 640
}

ReactCam.mountedInstances = [];
ReactCam.userMediaRequested = false;

module.exports = ReactCam;