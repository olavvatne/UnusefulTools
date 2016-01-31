import React from "react";
import UIButton from './mui/UIButton.js';
var XMLHttpRequest = require('xhr2');

class WhiteNoise extends React.Component {

    constructor() {
        super();
        this._toggle = this._handleClick.bind(this);
        this._volume = this._changeVolume.bind(this);

        this.sounds = [
            {name: "Brown noise", source: "sound/brown.mp3", image: "images/noise/noise.svg"},
            {name: "Ocean", source: "sound/ocean.mp3", image: "images/noise/ocean.svg"},
            {name: "Rain", source: "sound/rain.mp3", image: "images/noise/rain.svg"},
            {name: "Forest", source: "sound/forest.mp3", image: "images/noise/tree.svg"},
            {name: "Fire", source: "sound/fireplace.mp3", image: "images/noise/fireplace.svg"},
            {name: "Leaves", source: "sound/leaf.mp3", image: "images/noise/leaf.svg"},
            {name: "People", source: "sound/people.mp3", image: "images/noise/people.svg"},
            {name: "Cantina", source: "sound/cantina.mp3", image: "images/noise/cantina.svg"}
        ]
        this.state = {
            mute: false,
            volume: 100,
            browserSupport: true,
            context: null,
            masterGain: null
        };
    }

    _changeVolume(event, test) {
        var fraction = event.target.value / 100;
        this.state.masterGain.gain.value = fraction * fraction;
        this.setState({volume: event.target.value});
    }

    _handleClick() {
        if(this.state.mute) {
            this.state.masterGain.connect(this.state.context.destination);
            this.setState({mute: false});
        }
        else {
            this.state.masterGain.disconnect();
            this.setState({mute: true});
        }

    }


    componentDidMount() {
        /* --- set up web audio --- */
        try {
            window.AudioContext =  window.AudioContext || window.webkitAudioContext;
            var context = new window.AudioContext();
            var gainNode = context.createGain();
            gainNode.connect(context.destination);
            if(!context) {
                throw Error();
            }
            this.setState({context: context, masterGain: gainNode});
        }
        catch(err) {
            this.setState({browserSupport: false});
        }
    }

    render() {
        var sounds = this.sounds.map(sound => {
            return <Sound
                    name={sound.name}
                    source={sound.source}
                    image={sound.image}
                    context={this.state.context}
                    drain={this.state.masterGain}></Sound>
        });
        var label = this.state.mute ? "fa fa-2x fa-volume-off" : "fa fa-2x fa-volume-up";
        return (

            <div>
                <div className="mui-container pleasant-sound">
                    <h1>{WhiteNoise.toolTitle}</h1>
                   {WhiteNoise.toolDescription.map(line => {
                       return <p>{line}</p>
                   })}
                    {this.state.browserSupport ?

                        <div>
                            <div className="pleasant-sound__master">
                                <input className="input-range" type="range" min="0" max="100" value={this.state.volume} onChange={this._volume} />
                                <a className="button" onClick={this._toggle}>
                                    <i className={label}></i>
                                </a>

                            </div>
                            <div className="pleasant-sound__controls">
                            </div>
                            {sounds}
                        </div>
                    :<p>Web Audio API required. Some browser do not have support for this. Use chrome or firefox</p>}
                </div>
            </div>
        );
    }
}


class Sound extends React.Component {

    constructor() {
        super();
        this._volume = this._changeVolume.bind(this);
        this.state = {
            volume: 0
        };
    }

    componentWillReceiveProps(props) {
        if(!this.received) {
            this.gainNode = props.context.createGain();
            this.source = props.context.createBufferSource();
            this.source.connect(this.gainNode);
            this.gainNode.connect(props.drain);
            this.gainNode.gain.value = 0;
            this._getAudio(props.context);
            this.received = true;
        }

    }

    _changeVolume(event, test) {
        //IOS web audio require user action before playing sound...
        if(!this.state.play) {
            this.source.start(0);
            this.setState({play: true})
        }
        var fraction = event.target.value / 100;
        this.gainNode.gain.value = fraction * fraction;
        this.setState({volume: event.target.value});
    }

    _getAudio(context) {
        var url  = this.props.source;
        var source  = this.source;
        var that = this;

        var request = new XMLHttpRequest();
        request.open('GET', url, true);
        request.responseType = 'arraybuffer';
        request.onload = function() {
            context.decodeAudioData(request.response, function(response) {
                source.buffer = response;
                source.loop = true;
            }, function () { console.error('The request failed.'); } );
        };
        request.send();
    }

    render() {
        return (
            <div className="mui-col-md-3 mui-col-sm-4 pleasant-sound__thumb">
                <img src={this.props.image} alt={'icon of ' + this.props.name}/>
                <p>{this.props.name}</p>
                <input className="input-range" type="range" min="0" max="100" value={this.state.volume} onChange={this._volume} />
            </div>
        );
    }
}

WhiteNoise.toolTitle = "Pleasant noise";
WhiteNoise.toolDescription =  ["Need total focus and a productivity boost?", "Cancel out the environment by mixing different pleasant sounds"];
WhiteNoise.toolMetaDescription = "Pleasant noise generator. Sounds played in a loop. Rainy, ocean, brown noise, white noise " +
    "and other sounds.";

module.exports = WhiteNoise;