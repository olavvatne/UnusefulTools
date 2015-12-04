import React from "react";
import UIButton from './mui/UIButton.js';
var XMLHttpRequest = require('xhr2');

class WhiteNoise extends React.Component {

    constructor() {
        super();
        this._toggle = this._handleClick.bind(this);
        this._volume = this._changeVolume.bind(this);

        this.state = {
            play: false,
            volume: 100,
            browserSupport: true
        };
    }

    _changeVolume(event, test) {
        var fraction = event.target.value / 100;
        this.gainNode.gain.value = fraction * fraction;
        this.setState({volume: event.target.value});
    }

    _handleClick() {
        if(this.state.play) {
            console.log(this.source);
            this.source.stop();
            this.setState({play: false});
            return
        }

        this._getAudio();
    }

    _getAudio() {
        var url  = 'images/ocean.mp3';

        var context = this.context;
        var source  = this.source;
        var that = this;

        var request = new XMLHttpRequest();

        request.open('GET', url, true);

        request.responseType = 'arraybuffer';
        request.onload = function() {
            context.decodeAudioData(request.response, function(response) {
                /* --- play the sound AFTER the buffer loaded --- */
                //set the buffer to the response we just received.
                source.buffer = response;
                //start(0) should play asap.
                source.start(0);
                source.loop = true;
                that.setState({play: true})
            }, function () { console.error('The request failed.'); } );
        };
        request.send();
    }

    componentDidMount() {
        /* --- set up web audio --- */
        try {
            this.context = new AudioContext();
            this.gainNode = this.context.createGain();
            this.source = this.context.createBufferSource();
            this.source.connect(this.gainNode);
            this.gainNode.connect(this.context.destination);
            if(!this.context) {
                throw Error();
            }
        }
        catch(err) {
            this.setState({browserSupport: false});
        }


    }

    render() {

        var label = this.state.play ? "pause" : "play";
        return (

            <div className="mui-panel">
                <div className="mui-container">
                    <h1>{WhiteNoise.toolTitle}</h1>
                    <p>{WhiteNoise.toolDescription}</p>
                    {this.state.browserSupport ?
                        <div>


                            <UIButton
                                label={label}
                                primary={true}
                                onClick={this._toggle} />
                            <input type="range" min="0" max="100" value={this.state.volume} onChange={this._volume} />

                        </div>
                    :<p>Web Audio API required. Some browser do not have support for this. Use chrome or firefox</p>}
                </div>
            </div>

        );
    }
}

WhiteNoise.toolTitle = "Pleasant noise";
WhiteNoise.toolDescription =  "Some noises";
WhiteNoise.toolMetaDescription = "Pleasant noise generator. Audio loop";

module.exports = WhiteNoise;