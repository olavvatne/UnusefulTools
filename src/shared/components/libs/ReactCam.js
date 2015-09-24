import React, { Component, PropTypes } from 'react';

function hasGetUserMedia() {
    return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
    navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

class ReactCam extends Component {

    constructor() {
        super();
        this.state = {
            hasUserMedia: false,
            src: null
        };
    }

    componentDidMount() {
        if (!hasGetUserMedia()) {
            console.log("NOPE")
            return;
        }

        ReactCam.mountedInstances.push(this);

        if (!this.state.hasUserMedia && !ReactCam.userMediaRequested) {
            console.log("REQUESTS!")
            this.requestUserMedia();
        }
    }

    requestUserMedia() {
        navigator.getUserMedia = navigator.getUserMedia ||
            navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia ||
            navigator.msGetUserMedia;

        var mediaOptions = { audio: false, video: true };

        navigator.getUserMedia(mediaOptions, (stream) => {
            ReactCam.mountedInstances.forEach((instance) => instance.handleUserMedia(null, stream));
        }, (e) => {
            ReactCam.mountedInstances.forEach((instance) => instance.handleUserMedia(e));
        });

        ReactCam.userMediaRequested = true;
    }

    handleUserMedia(error, stream) {
        if (error) {
            console.log("ERROR");
            this.setState({
                hasUserMedia: false
            });

            return;
        }

        let src = window.URL.createObjectURL(stream);
        console.log(src);
        this.stream = stream;
        this.setState({
            hasUserMedia: true,
            src: src
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
                autoPlay={true}
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